import CookieManager, { Cookie } from "@react-native-cookies/cookies";
import { useEffect } from "react";
import EncryptedStorage from "react-native-encrypted-storage";

import { baseUrl } from "@_shared/config/domain";
import { REFRESH_TOKEN_KEY } from "@_shared/constants/storage";

/** 자동 로그인을 위한 훅입니다. `EncryptedStorage`에 `Refresh-Token`이 있다면 쿠키에 저장합니다. */
export const useTokenCookieManager = () => {
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
};
