/* eslint-disable @typescript-eslint/no-explicit-any */

import appleAuth from "@invertase/react-native-apple-authentication";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getAccessToken, getProfile, login } from "@react-native-seoul/kakao-login";
import { useCallback } from "react";

const firebaseAuth = auth();

interface LoginHookParams {
  onSuccess?: (IdToken: string) => void;
  onError?: (error: Error) => void;
}

const useFirebaseAuth = ({ onSuccess, onError }: LoginHookParams = {}) => {
  const getFirebaseToken = useCallback(
    async (user: FirebaseAuthTypes.User | null): Promise<string | null> => {
      if (user) {
        try {
          await user.reload();

          // 카카오 로그인일 경우, 카카오 인증 상태 확인
          if (user.displayName === "kakao") {
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
    },
    []
  );

  const handleAuthSuccess = useCallback(
    async (credential: FirebaseAuthTypes.UserCredential) => {
      try {
        if (!credential.user) throw new Error("Firebase Auth Error");

        const token = await credential.user.getIdToken();
        onSuccess?.(token);
      } catch (error: any) {
        console.error("[Auth]", error);
        onError?.(error);
      }
    },
    [onSuccess, onError]
  );

  const emailLogin = useCallback(
    async (email: string, password: string, kakao?: boolean) => {
      try {
        // Firebase Auth
        const response = await firebaseAuth.signInWithEmailAndPassword(email, password);
        await handleAuthSuccess(response);
      } catch (error: any) {
        if (error.code === "auth/invalid-credential") {
          try {
            // Firebase SignUp
            const response = await firebaseAuth.createUserWithEmailAndPassword(email, password);
            if (kakao) await response.user.updateProfile({ displayName: "kakao" });
            else await response.user.updateProfile({ displayName: "email" });
            await handleAuthSuccess(response);
          } catch (innerErr: any) {
            console.error("[Firebase Auth]", innerErr);
            onError?.(innerErr);
          }
        } else {
          console.error("[Firebase Auth]", error);
          onError?.(error);
        }
      }
    },
    [handleAuthSuccess, onError]
  );

  const kakaoLogin = useCallback(async (): Promise<void> => {
    try {
      // Kakao Auth
      await login();
      const { id, email } = await getProfile();
      const password = `A!@${id}`;

      emailLogin(email, password, true);
    } catch (error: any) {
      console.error("[Kakao Auth]", error);
      onError?.(error);
    }
  }, [emailLogin, onError]);

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

  const googleLogin = useCallback(async (): Promise<void> => {
    try {
      // Google Auth
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const googleAuthResult = await GoogleSignin.signIn();

      if (!googleAuthResult.idToken) throw new Error("Google Auth Error");

      // Firebase Auth
      const googleCredential = auth.GoogleAuthProvider.credential(googleAuthResult.idToken);
      const response = await firebaseAuth.signInWithCredential(googleCredential);
      await response.user.updateProfile({ displayName: "google" });
      await handleAuthSuccess(response);
    } catch (error: any) {
      console.log(error.message);
      console.error("[Google Auth]", error);
      onError?.(error);
    }
  }, [handleAuthSuccess, onError]);

  /**
   * Apple 로그인 [ Apple 개발자 유료 등록 후 사용가능 ]
   */
  const appleLogin = useCallback(async (): Promise<void> => {
    try {
      const appleAuthResult = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
      });

      if (!appleAuthResult.identityToken) throw new Error("Apple Auth Error");

      const { identityToken, nonce } = appleAuthResult;

      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      const response = await firebaseAuth.signInWithCredential(appleCredential);
      await response.user.updateProfile({ displayName: "apple" });
      await handleAuthSuccess(response);
    } catch (error: any) {
      console.error("[Apple Auth]", error);
      onError?.(error);
    }
  }, [handleAuthSuccess, onError]);

  return {
    getFirebaseToken,
    emailLogin,
    kakaoLogin,
    googleLogin,
    appleLogin
  };
};

export default useFirebaseAuth;
