import CookieManager from "@react-native-cookies/cookies";
import { useCallback } from "react";
import EncryptedStorage from "react-native-encrypted-storage";

const useLogout = () => {
  return useCallback(async () => {
    EncryptedStorage.clear();
    CookieManager.clearAll();
  }, []);
};

export default useLogout;
