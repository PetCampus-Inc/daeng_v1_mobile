import appleAuth from "@invertase/react-native-apple-authentication";
import firebaseAuth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { login as kakaoLogin } from "@react-native-seoul/kakao-login";
import Config from "react-native-config";

import { SocialProvider } from "../model/types";

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: Config.GOOGLE_WEB_CLIENT_ID,
    iosClientId: Config.GOOGLE_WEB_CLIENT_ID_IOS,
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
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    if (!idToken) throw new Error("구글 인증 정보가 없습니다.");
    const credential = firebaseAuth.GoogleAuthProvider.credential(idToken);
    return { credential, userName: null };
  };

  const getKakaoCredential = async () => {
    const { idToken } = await kakaoLogin();
    if (!idToken) throw new Error("카카오 인증 정보가 없습니다.");
    const credential = firebaseAuth.OIDCAuthProvider.credential("kakao", idToken);
    return { credential, userName: null };
  };

  const getAppleCredential = async () => {
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
