import EncryptedStorage from "react-native-encrypted-storage";

import { KEYS } from "~/constants/storage";
import { User } from "~/types/auth.types";

/**
 * User를 관리하는 훅입니다.
 * @returns `getUser` 스토리지에서 User를 가져옵니다.
 * @returns `setUser` 스토리지에 User를 저장합니다.
 */
export default function useUser() {
  /** 스토리지에 User를 저장합니다. */
  const setUser = async (user: User) => {
    await EncryptedStorage.setItem(KEYS.USER, user);
  };

  /** 스토리지에서 User를 가져옵니다. */
  const getUser = async () => {
    const user = await EncryptedStorage.getItem(KEYS.USER);
    return user;
  };

  return { getUser, setUser };
}
