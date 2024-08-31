import EncryptedStorage from "react-native-encrypted-storage";

import { KEYS } from "~/constants/storage";

/**
 * `Refresh-Token`을 관리하는 훅입니다.
 * @returns `getRefreshToken` 스토리지에서 `Refresh-Token`을 가져옵니다.
 * @returns `setRefreshToken` 스토리지에 `Refresh-Token`을 저장합니다.
 */
export default function useRefreshToken() {
  /** 스토리지에 `Refresh-Token`을 저장합니다. */
  const setRefreshToken = async (token: string) => {
    await EncryptedStorage.setItem(KEYS.REFRESH_TOKEN, token);
  };

  /** 스토리지에서 `Refresh-Token`을 가져옵니다. */
  const getRefreshToken = async () => {
    const refreshToken = await EncryptedStorage.getItem(KEYS.REFRESH_TOKEN);
    return refreshToken;
  };

  return { getRefreshToken, setRefreshToken };
}
