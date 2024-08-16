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
  onSuccess?: (IdToken: string) => void;
  onError?: (error: Error) => void;
}

const useFirebaseAuth = ({ onSuccess, onError }: LoginHookParams = {}) => {
  /**
   * Firebase 유저 검증 후 IDToken을 반환합니다.
   */
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

  /**
   * Kakao 로그인
   */
  const kakaoLogin = useCallback(async (): Promise<string> => {
    try {
      // Kakao Auth
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

  /**
   * Google 로그인
   */
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

  /**
   * Apple 로그인
   */
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

  const firebaseSignOut = useCallback(async () => firebaseAuth.signOut(), []);

  const socialLogin = async (provider: SocialProvider) => {
    switch (provider) {
      case "KAKAO":
        return await kakaoLogin();
      case "GOOGLE":
        return await googleLogin();
      case "APPLE":
        return await appleLogin();
      default:
        throw new Error("Unsupported Social Provider");
    }
  };

  useEffect(() => {
    googleSigninConfigure();
  }, []);

  return {
    getFirebaseToken,
    kakaoLogin,
    googleLogin,
    appleLogin,
    socialLogin,
    firebaseSignOut
  };
};

export default useFirebaseAuth;
