import {
  APPLE_REDIRECT_URI,
  APPLE_SERVICE_ID,
  GOOGLE_WEB_CLIENT_ID,
  GOOGLE_WEB_CLIENT_ID_IOS
} from "@env";
import appleAuth, { appleAuthAndroid } from "@invertase/react-native-apple-authentication";
import firebaseAuth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import {
  getProfile as getKakaoProfile,
  login as kakaoLogin
} from "@react-native-seoul/kakao-login";
import { Alert, Platform } from "react-native";
import EncryptedStorage from "react-native-encrypted-storage";
import { v4 as uuidv4 } from "uuid";

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

// JWT payload 디코드 (id_token의 sub claim을 캐시 키로 사용하기 위함)
const decodeJwtSub = (jwt: string): string | null => {
  try {
    const payload = jwt.split(".")[1];
    if (!payload) return null;
    const normalized = payload.replace(/-/g, "+").replace(/_/g, "/");
    const padded = normalized.padEnd(normalized.length + ((4 - (normalized.length % 4)) % 4), "=");
    const decoded = globalThis.atob(padded);
    const parsed = JSON.parse(decoded) as { sub?: string };
    return parsed.sub ?? null;
  } catch {
    return null;
  }
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

  // iOS는 네이티브 Sign In with Apple, Android는 웹 OAuth (Service ID + Redirect URI 필요)
  const composeAppleUserName = async (
    composed: string,
    sub: string | null
  ): Promise<string | null> => {
    const cacheKey = sub ? `${APPLE_USERNAME_KEY_PREFIX}${sub}` : null;
    if (composed) {
      if (cacheKey) {
        try {
          await EncryptedStorage.setItem(cacheKey, composed);
        } catch {
          /* 캐시 실패는 무시 */
        }
      }
      return composed;
    }
    if (cacheKey) {
      try {
        return await EncryptedStorage.getItem(cacheKey);
      } catch {
        return null;
      }
    }
    return null;
  };

  const getAppleCredentialIOS = async () => {
    const { identityToken, nonce, fullName, user } = await appleAuth.performRequest({
      requestedOperation: appleAuth.Operation.LOGIN,
      requestedScopes: [appleAuth.Scope.FULL_NAME]
    });

    if (!identityToken) throw new Error("애플 인증 정보가 없습니다.");

    const composed = `${fullName?.familyName ?? ""}${fullName?.givenName ?? ""}`.trim();
    const userName = await composeAppleUserName(composed, user || null);

    const credential = firebaseAuth.AppleAuthProvider.credential(identityToken, nonce);
    return { credential, userName };
  };

  const getAppleCredentialAndroid = async () => {
    if (!APPLE_SERVICE_ID || !APPLE_REDIRECT_URI) {
      throw new Error("애플 로그인 환경설정이 누락되었습니다.");
    }

    const rawNonce = uuidv4();
    const state = uuidv4();

    appleAuthAndroid.configure({
      clientId: APPLE_SERVICE_ID,
      redirectUri: APPLE_REDIRECT_URI,
      responseType: appleAuthAndroid.ResponseType.ALL,
      scope: appleAuthAndroid.Scope.ALL,
      nonce: rawNonce,
      state
    });

    const response = await appleAuthAndroid.signIn();
    const identityToken = response.id_token;
    if (!identityToken) throw new Error("애플 인증 정보가 없습니다.");

    const first = response.user?.name?.firstName ?? "";
    const last = response.user?.name?.lastName ?? "";
    const composed = `${last}${first}`.trim();

    const sub = decodeJwtSub(identityToken);
    const userName = await composeAppleUserName(composed, sub);

    const credential = firebaseAuth.AppleAuthProvider.credential(identityToken, rawNonce);
    return { credential, userName };
  };

  const getAppleCredential = async () => {
    try {
      return Platform.OS === "android"
        ? await getAppleCredentialAndroid()
        : await getAppleCredentialIOS();
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
