import CookieManager from "@react-native-cookies/cookies";
import { useCallback } from "react";
import EncryptedStorage from "react-native-encrypted-storage";

import { REFRESH_TOKEN_KEY } from "@_shared/constants/storage";

export const useLogout = () => {
  return useCallback(async () => {
    try {
      EncryptedStorage.removeItem(REFRESH_TOKEN_KEY);
    } catch (error) {
      console.log("[useLogout]", error);
    }
    CookieManager.clearAll();
  }, []);
};
