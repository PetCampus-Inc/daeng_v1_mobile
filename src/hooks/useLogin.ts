import { getProfile, login } from "@react-native-seoul/kakao-login";
import appleAuth from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const firebaseAuth = auth();

interface LoginHookParams {
  onSuccess?: (token: string) => void;
  onError?: (error: Error) => void;
}

const useLogin = ({ onSuccess, onError }: LoginHookParams = {}) => {
  const serverLogin = (firebaseToken: string) => {
    console.log(firebaseToken);
  };

  const kakaoLogin = async (): Promise<void> => {
    try {
      // Kakao Signin
      await login();
      const { id, email } = await getProfile();
      const password = `A!@${id}`;

      try {
        // Firebase Auth
        const { user } = await firebaseAuth.signInWithEmailAndPassword(email, password);
        const token = await user.getIdToken();

        serverLogin(token);
      } catch (err: any) {
        if (err.code === "auth/invalid-credential") {
          // Create Firebase Account
          await firebaseAuth.createUserWithEmailAndPassword(email, password);

          // Firebase Auth
          const { user } = await firebaseAuth.signInWithEmailAndPassword(email, password);
          const token = await user.getIdToken();

          serverLogin(token);
        } else {
          throw err;
        }
      }
    } catch (err) {
      console.error("Login error:", err);
    }
  };

  const googleLogin = async (): Promise<void> => {
    try {
      // Google Signin
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();

      // Firebase Auth
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const { user } = await firebaseAuth.signInWithCredential(googleCredential);
      const token = await user.getIdToken();

      serverLogin(token);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Apple 로그인 [ Apple 개발자 유료 등록 후 사용가능 ]
   */
  const appleLogin = async (): Promise<void> => {
    const response = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.EMAIL, appleAuth.Scope.FULL_NAME]
    });

    if (!response.identityToken) {
      throw new Error("ID 토큰이 반환되지 않았습니다.");
    }

    const { identityToken, nonce } = response;
    const appleCredential = auth.AppleAuthProvider.credential(identityToken, nonce);
    const appleAuthResponse = firebaseAuth.signInWithCredential(appleCredential);
  };

  return { kakaoLogin, googleLogin, appleLogin };
};

export default useLogin;
