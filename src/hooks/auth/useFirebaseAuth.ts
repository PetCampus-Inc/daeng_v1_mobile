/* eslint-disable @typescript-eslint/no-explicit-any */

import { GOOGLE_WEB_CLIENT_ID, GOOGLE_WEB_CLIENT_ID_IOS } from "@env";
import appleAuth from "@invertase/react-native-apple-authentication";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getAccessToken, login } from "@react-native-seoul/kakao-login";
import { useCallback, useEffect } from "react";

import { SocialProvider } from "~/types/auth.types";

const firebaseAuth = auth();

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_WEB_CLIENT_ID_IOS,
    offlineAccess: true
  });
};

interface LoginHookParams {
  /** 로그인 완료 후, `Firebase` 인증 성공 시 호출될 함수 */
  onSuccess?: (IdToken: string) => void;
  /** `Firebase` 인증 실패 시 호출될 함수 */
  onError?: (error: Error) => void;
}

/**
 * `Firebase`를 연동해 소셜 로그인을 처리하는 훅입니다.
 * @param onSuccess 로그인 완료 후, `Firebase` 인증 성공 시 호출될 함수
 * @param onError `Firebase` 인증 실패 시 호출될 함수
 */
const useFirebaseAuth = ({ onSuccess, onError }: LoginHookParams = {}) => {
  /** `Firebase` 유저 검증 후 `IDToken`을 반환합니다. */
  const getFirebaseToken = useCallback(async (): Promise<string | null> => {
    const user = firebaseAuth.currentUser;
    if (user) {
      try {
        await user.reload();

        const { signInProvider } = await user.getIdTokenResult();

        // 카카오 로그인일 경우, 카카오 인증 상태 확인
        if (signInProvider && signInProvider.includes("kakao")) {
          const isKakaoAuth = await isKakaoAuthenticated();
          if (!isKakaoAuth) {
            await firebaseAuth.signOut();
            return null;
          }
        }

        const newToken = await user.getIdToken(true);
        return newToken;
      } catch (error) {
        console.error("[Firebase Auth]", error);
        return null;
      }
    } else {
      return null;
    }
  }, []);

  /** `Firebase` 인증 성공을 처리합니다. */
  const handleAuthSuccess = useCallback(
    async (credential: FirebaseAuthTypes.AuthCredential): Promise<string> => {
      try {
        const { user } = await firebaseAuth.signInWithCredential(credential);
        const token = await user.getIdToken();

        onSuccess?.(token);

        return token;
      } catch (error: any) {
        console.error("[Auth]", error);
        onError?.(error);
        throw error;
      }
    },
    [onSuccess, onError]
  );

  /** 카카오 로그인 */
  const kakaoLogin = useCallback(async (): Promise<string> => {
    try {
      const { idToken } = await login();
      const credential = auth.OIDCAuthProvider.credential("kakao", idToken);
      return await handleAuthSuccess(credential);
    } catch (error: any) {
      console.error("[Kakao Auth]", error);
      onError?.(error);
      throw error;
    }
  }, [handleAuthSuccess, onError]);

  /**
   * 카카오 인증 상태를 확인합니다.
   * @returns 카카오 인증이 유효하면 true, 그렇지 않으면 false를 반환합니다.
   */
  const isKakaoAuthenticated = async (): Promise<boolean> => {
    try {
      const kakaoToken = await getAccessToken();
      if (!kakaoToken) throw new Error("Kakao Auth Error");
    } catch (error) {
      console.log("[Kakao Auth]", error);
      return false;
    }
    return true;
  };

  /** 구글 로그인 */
  const googleLogin = useCallback(async (): Promise<string> => {
    try {
      // Google Auth
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const googleAuthResult = await GoogleSignin.signIn();

      if (!googleAuthResult.idToken) throw new Error("Google Auth Error");

      // Firebase Auth
      const credential = auth.GoogleAuthProvider.credential(googleAuthResult.idToken);
      return await handleAuthSuccess(credential);
    } catch (error: any) {
      console.log(error.message);
      console.error("[Google Auth]", error);
      onError?.(error);
      throw error;
    }
  }, [handleAuthSuccess, onError]);

  /** 애플 로그인 */
  const appleLogin = useCallback(async (): Promise<string> => {
    try {
      const appleAuthResult = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
      });

      if (!appleAuthResult.identityToken) throw new Error("Apple Auth Error");

      const { identityToken, nonce } = appleAuthResult;

      const credential = auth.AppleAuthProvider.credential(identityToken, nonce);
      return await handleAuthSuccess(credential);
    } catch (error: any) {
      console.error("[Apple Auth]", error);
      onError?.(error);
      throw error;
    }
  }, [handleAuthSuccess, onError]);

  /** `Firebase` 로그아웃 */
  const firebaseSignOut = useCallback(async () => firebaseAuth.signOut(), []);

  /**
   * 소셜 로그인을 처리합니다.
   * @param provider 소셜 로그인 제공자 (`KAKAO`, `GOOGLE`, `APPLE`)
   */
  const socialLogin = useCallback(
    async (provider: SocialProvider): Promise<string> => {
      switch (provider) {
        case "KAKAO":
          return await kakaoLogin();
        case "GOOGLE":
          return await googleLogin();
        case "APPLE":
          return await appleLogin();
        default:
          throw new Error(`지원하지 않는 소셜 로그인입니다. [${provider}]`);
      }
    },
    [kakaoLogin, googleLogin, appleLogin]
  );

  useEffect(() => {
    googleSigninConfigure();
  }, []);

  return {
    getFirebaseToken,
    socialLogin,
    firebaseSignOut
  };
};

export default useFirebaseAuth;
