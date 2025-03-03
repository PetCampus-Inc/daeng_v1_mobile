import { GOOGLE_WEB_CLIENT_ID, GOOGLE_WEB_CLIENT_ID_IOS } from "@env";
import appleAuth from "@invertase/react-native-apple-authentication";
import firebaseAuth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { login as kakaoLogin } from "@react-native-seoul/kakao-login";
import { Alert } from "react-native";

import { SocialProvider } from "../model/types";

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_WEB_CLIENT_ID_IOS,
    offlineAccess: true
  });
};

/**
 * Firebase Auth 소셜 로그인
 * @param provider 소셜 로그인 플랫폼
 * @returns Firebase `IDToken`
 */
export default async function firebaseSocialAuth(provider: SocialProvider) {
  googleSigninConfigure();

  const getGoogleCredential = async () => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      if (!idToken) throw new Error("구글 인증 정보가 없습니다.");
      const credential = firebaseAuth.GoogleAuthProvider.credential(idToken);
      return { credential, userName: null };
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      Alert.alert("구글 로그인 실패", errMessage);
      throw error;
    }
  };

  const getKakaoCredential = async () => {
    try {
      const { idToken } = await kakaoLogin();
      if (!idToken) throw new Error("카카오 인증 정보가 없습니다.");
      const credential = firebaseAuth.OIDCAuthProvider.credential("kakao", idToken);
      return { credential, userName: null };
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      Alert.alert("카카오 로그인 실패", errMessage);
      throw error;
    }
  };

  const getAppleCredential = async () => {
    try {
      const { identityToken, nonce, fullName } = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME]
      });

      let userName = null;
      if (fullName && fullName.familyName && fullName.givenName) {
        userName = `${fullName.familyName}${fullName.givenName}`;
      }

      if (!identityToken) throw new Error("애플 인증 정보가 없습니다.");
      const credential = firebaseAuth.AppleAuthProvider.credential(identityToken, nonce);
      return { credential, userName };
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      Alert.alert("애플 로그인 실패", errMessage);
      throw error;
    }
  };

  const credentialMap = {
    GOOGLE: getGoogleCredential,
    KAKAO: getKakaoCredential,
    APPLE: getAppleCredential
  };

  const { credential, userName } = await credentialMap[provider]();
  const { user } = await firebaseAuth().signInWithCredential(credential);

  const idToken = await user.getIdToken();

  return { idToken, userName };
}
