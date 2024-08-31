import CookieManager, { Cookie } from "@react-native-cookies/cookies";
import { useEffect } from "react";

import { baseUrl } from "~/config/url";
import useRefreshToken from "~/hooks/auth/useRefreshToken";

/**
 * 자동 로그인을 위한 훅입니다. `EncryptedStorage`에 `Refresh-Token`이 있다면 쿠키에 저장합니다.
 * @returns `extractAndSaveRefreshToken` 쿠키에서 `Refresh-Token` 추출 후 스토리지에 저장합니다.
 */
export default function useTokenCookieManager() {
  const { getRefreshToken, setRefreshToken } = useRefreshToken();

  /** 쿠키에서 `Refresh-Token` 추출 후 스토리지에 저장합니다. */
  const extractAndSaveRefreshToken = async () => {
    const cookies = await CookieManager.get(baseUrl);
    const refreshToken = cookies.refreshToken;

    if (!refreshToken) return;

    setRefreshToken(refreshToken.value);
  };

  /** 쿠키에 `Refresh-Token`을 저장합니다. */
  useEffect(() => {
    const setCookieRefreshToken = async () => {
      const refreshToken = await getRefreshToken();
      if (!refreshToken) return;

      const tokenCookie: Cookie = {
        name: "refreshToken",
        value: refreshToken,
        httpOnly: true
      };

      await CookieManager.set(baseUrl, tokenCookie);
    };

    setCookieRefreshToken();
  }, [getRefreshToken]);

  return { extractAndSaveRefreshToken };
}
