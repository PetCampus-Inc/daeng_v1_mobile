import CookieManager from "@react-native-cookies/cookies";
import { useCallback } from "react";
import EncryptedStorage from "react-native-encrypted-storage";

import { REFRESH_TOKEN_KEY } from "~/constants/storage";

const useLogout = () => {
  return useCallback(async () => {
    EncryptedStorage.removeItem(REFRESH_TOKEN_KEY);
    CookieManager.clearAll();
  }, []);
};

export default useLogout;
