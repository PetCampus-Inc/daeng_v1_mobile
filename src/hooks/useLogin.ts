import { getProfile, login } from "@react-native-seoul/kakao-login";
import appleAuth from "@invertase/react-native-apple-authentication";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

const firebaseAuth = auth();

const useLogin = () => {
  const kakaoLogin = async (): Promise<void> => {
    const response = await login();
    console.log(response);

    const { id, email } = await getProfile();
    const password = `A!@${id}`;

    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(
        (response) => console.log(response)
        // (fail) => console.log(fail)
      )
      .catch((err) => {
        if (err.code === "auth/invalid-credential") {
          createFirebaseUser(email, password);
        }
      });

    console.log(email, id, password);
    createFirebaseUser(email, password);
  };

  const googleLogin = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const res = await auth().signInWithCredential(googleCredential);
      console.log(res);
    } catch (error) {
      console.error(error);
    }
  };

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
    const appleAuthResponse = auth().signInWithCredential(appleCredential);
  };

  const createFirebaseUser = async (email: string, password: string): Promise<void> => {
    firebaseAuth.createUserWithEmailAndPassword(email, password).then(
      (success) => {
        console.log(success);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  return { kakaoLogin, googleLogin, appleLogin };
};

export default useLogin;
