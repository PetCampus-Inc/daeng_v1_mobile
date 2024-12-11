import { GOOGLE_WEB_CLIENT_ID, GOOGLE_WEB_CLIENT_ID_IOS } from "@env";
import appleAuth from "@invertase/react-native-apple-authentication";
import firebaseAuth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { login as kakaoLogin } from "@react-native-seoul/kakao-login";

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
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    const { idToken } = await GoogleSignin.signIn();
    if (!idToken) throw new Error("구글 인증 정보가 없습니다.");
    return firebaseAuth.GoogleAuthProvider.credential(idToken);
  };

  const getKakaoCredential = async () => {
    const { idToken } = await kakaoLogin();
    if (!idToken) throw new Error("카카오 인증 정보가 없습니다.");
    return firebaseAuth.OIDCAuthProvider.credential("kakao", idToken);
  };

  const getAppleCredential = async () => {
    const { identityToken, nonce } = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: []
    });

    if (!identityToken) throw new Error("애플 인증 정보가 없습니다.");
    return firebaseAuth.AppleAuthProvider.credential(identityToken, nonce);
  };

  const credentialMap = {
    GOOGLE: getGoogleCredential,
    KAKAO: getKakaoCredential,
    APPLE: getAppleCredential
  };

  const credential = await credentialMap[provider]();
  const { user } = await firebaseAuth().signInWithCredential(credential);

  return user.getIdToken();
}
