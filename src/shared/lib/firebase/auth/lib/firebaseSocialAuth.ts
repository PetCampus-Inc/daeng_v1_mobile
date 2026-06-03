import { GOOGLE_WEB_CLIENT_ID, GOOGLE_WEB_CLIENT_ID_IOS } from "@env";
import appleAuth from "@invertase/react-native-apple-authentication";
import firebaseAuth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  getProfile as getKakaoProfile,
  login as kakaoLogin
} from "@react-native-seoul/kakao-login";
import { Alert } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";

import { SocialProvider } from "../model/types";

// Apple은 최초 로그인 1회에만 fullName을 반환하므로 클라이언트가 캐싱해야 함
const APPLE_USERNAME_KEY_PREFIX = "APPLE_USERNAME:";

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
      const result = await GoogleSignin.signIn();
      const { idToken } = result;
      if (!idToken) throw new Error("구글 인증 정보가 없습니다.");
      const credential = firebaseAuth.GoogleAuthProvider.credential(idToken);
      const userName = result.user?.name ?? null;
      return { credential, userName };
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

      let userName: string | null = null;
      try {
        const profile = await getKakaoProfile();
        userName = "nickname" in profile ? (profile.nickname ?? null) : null;
      } catch {
        userName = null;
      }

      return { credential, userName };
    } catch (error) {
      const errMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";
      Alert.alert("카카오 로그인 실패", errMessage);
      throw error;
    }
  };

  const getAppleCredential = async () => {
    try {
      const { identityToken, nonce, fullName, user } = await appleAuth.performRequest({
        requestedOperation: appleAuth.Operation.LOGIN,
        requestedScopes: [appleAuth.Scope.FULL_NAME]
      });

      if (!identityToken) throw new Error("애플 인증 정보가 없습니다.");

      const cacheKey = user ? `${APPLE_USERNAME_KEY_PREFIX}${user}` : null;

      let userName: string | null = null;
      const composed = `${fullName?.familyName ?? ""}${fullName?.givenName ?? ""}`.trim();

      if (composed) {
        userName = composed;
        if (cacheKey) {
          try {
            await EncryptedStorage.setItem(cacheKey, composed);
          } catch {
            /* 캐시 실패는 무시 */
          }
        }
      } else if (cacheKey) {
        try {
          userName = await EncryptedStorage.getItem(cacheKey);
        } catch {
          userName = null;
        }
      }

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
