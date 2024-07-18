/* eslint-disable @typescript-eslint/no-explicit-any */

import appleAuth from "@invertase/react-native-apple-authentication";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getProfile, login } from "@react-native-seoul/kakao-login";
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
    async (email: string, password: string) => {
      try {
        // Firebase Auth
        const response = await firebaseAuth.signInWithEmailAndPassword(email, password);
        await handleAuthSuccess(response);
      } catch (error: any) {
        if (error.code === "auth/invalid-credential") {
          try {
            // Firebase SignUp
            const response = await firebaseAuth.createUserWithEmailAndPassword(email, password);
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

      emailLogin(email, password);
    } catch (error: any) {
      console.error("[Kakao Auth]", error);
      onError?.(error);
    }
  }, [emailLogin, onError]);

  const googleLogin = useCallback(async (): Promise<void> => {
    try {
      // Google Auth
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const googleAuthResult = await GoogleSignin.signIn();

      if (!googleAuthResult.idToken) throw new Error("Google Auth Error");

      // Firebase Auth
      const googleCredential = auth.GoogleAuthProvider.credential(googleAuthResult.idToken);
      const response = await firebaseAuth.signInWithCredential(googleCredential);
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
