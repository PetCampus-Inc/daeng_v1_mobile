import CookieManager, { Cookie } from "@react-native-cookies/cookies";
import { useEffect } from "react";
import EncryptedStorage from "react-native-encrypted-storage";

import { baseUrl } from "@_shared/config/domain";
import { REFRESH_TOKEN_KEY } from "@_shared/constants/storage";

/**
 * 자동 로그인을 위한 훅입니다. `EncryptedStorage`에 `Refresh-Token`이 있다면 쿠키에 저장합니다.
 * @returns `extractAndSaveRefreshToken` 쿠키에서 `Refresh-Token` 추출 후 스토리지에 저장합니다.
 */
export const useTokenCookieManager = () => {
  /** 쿠키에서 `Refresh-Token` 추출 후 스토리지에 저장합니다. */
  const extractAndSaveRefreshToken = async () => {
    const cookies = await CookieManager.get(baseUrl);
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) return;

    await EncryptedStorage.setItem(REFRESH_TOKEN_KEY, refreshToken.value);
  };

  /** 쿠키에 `Refresh-Token`을 저장합니다. */
  useEffect(() => {
    const setCookieRefreshToken = async () => {
      const refreshToken = await EncryptedStorage.getItem(REFRESH_TOKEN_KEY);
      if (!refreshToken) return;

      const tokenCookie: Cookie = {
        name: "refreshToken",
        value: refreshToken,
        httpOnly: true
      };

      await CookieManager.set(baseUrl, tokenCookie);
    };

    setCookieRefreshToken();
  }, []);

  return { extractAndSaveRefreshToken };
};
