import auth from "@react-native-firebase/auth";
import { getProfile, login } from "@react-native-seoul/kakao-login";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import appleAuth from "@invertase/react-native-apple-authentication";

const firebaseAuth = auth();

interface LoginHookParams {
  onSuccess?: (token: string) => void;
  onError?: (error: Error) => void;
}

const useLogin = ({ onSuccess, onError }: LoginHookParams = {}) => {
  const serverLogin = (firebaseToken: string) => {
    console.log(firebaseToken);

    // 서버 로그인 API 호출
  };

  const emailLogin = async (email: string, password: string) => {
    try {
      // Firebase Auth
      const signInResult = await firebaseAuth.signInWithEmailAndPassword(email, password);
      const token = await signInResult.user.getIdToken();

      serverLogin(token);
    } catch (err: any) {
      if (err.code == "auth/invalid-credential") {
        try {
          // Firebase SignUp
          const signUpResult = await firebaseAuth.createUserWithEmailAndPassword(email, password);
          const token = await signUpResult.user.getIdToken();

          serverLogin(token);
        } catch (err: any) {
          console.error("[Firebase Auth]", err);
          onError?.(err);
        }
      } else {
        console.error("[Firebase Auth]", err);
        onError?.(err);
      }
    }
  };

  const kakaoLogin = async (): Promise<void> => {
    try {
      // Kakao Auth
      await login();
      const { id, email } = await getProfile();
      const password = `A!@${id}`;

      emailLogin(email, password);
    } catch (err: any) {
      console.error("[Kakao Auth]", err);
      onError?.(err);
    }
  };

  const googleLogin = async (): Promise<void> => {
    try {
      // Google Auth
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const googleAuthResult = await GoogleSignin.signIn();

      if (!googleAuthResult.idToken) throw new Error("Google Auth Error");

      // Firebase Auth
      const googleCredential = auth.GoogleAuthProvider.credential(googleAuthResult.idToken);
      const signInResult = await firebaseAuth.signInWithCredential(googleCredential);
      if (!signInResult.user) throw new Error("Firebase Auth Error");

      const token = await signInResult.user.getIdToken();
      if (!token) throw new Error("Firebase Token Error");

      serverLogin(token);
    } catch (err) {
      console.error("[Google Auth]", err);
    }
  };

  /**
   * Apple 로그인 [ Apple 개발자 유료 등록 후 사용가능 ]
   */
  const appleLogin = async (): Promise<void> => {
    try {
      const appleAuthResult = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
      });

      if (!appleAuthResult.identityToken) throw new Error("Apple Auth Error");

      const { identityToken, nonce } = appleAuthResult;

      const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
      const signInResult = await firebaseAuth.signInWithCredential(appleCredential);
      if (!signInResult.user) throw new Error("Firebase Auth Error");

      const token = await signInResult.user.getIdToken();
      if (!token) throw new Error("Firebase Token Error");

      serverLogin(token);
    } catch (err) {
      console.error("[Apple Auth]", err);
    }
  };

  return { emailLogin, kakaoLogin, googleLogin, appleLogin };
};

export default useLogin;
