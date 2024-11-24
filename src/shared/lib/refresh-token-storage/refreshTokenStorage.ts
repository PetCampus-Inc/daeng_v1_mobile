import CookieManager from "@react-native-cookies/cookies";
import EncryptedStorage from "react-native-encrypted-storage";

import { baseUrl } from "@_shared/config/domain";
import { REFRESH_TOKEN_KEY } from "@_shared/constants/storage";

/** 쿠키에서 `Refresh-Token` 추출 후 스토리지에 저장합니다. */
export const saveRefreshToken = async () => {
  const cookies = await CookieManager.get(baseUrl);
  const refreshToken = cookies.refreshToken;

  if (!refreshToken) return;

  await EncryptedStorage.setItem(REFRESH_TOKEN_KEY, refreshToken.value);
};

/** 스토리지와 쿠키에서 `Refresh-Token` 삭제합니다. */
export const removeRefreshToken = async () => {
  EncryptedStorage.removeItem(REFRESH_TOKEN_KEY);
  CookieManager.clearAll();
};
