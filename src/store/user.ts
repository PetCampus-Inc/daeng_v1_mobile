import EncryptedStorage from "react-native-encrypted-storage";
import { atom } from "recoil";

import { UserInfo } from "~/types/auth.types";

export const loginState = atom<boolean>({
  key: "loginState",
  default: false
});

type UserState = UserInfo | null | "pending";
export const userState = atom<UserState>({
  key: "userState",
  default: "pending",
  effects: [
    ({ setSelf, onSet }) => {
      const loadUserInfo = async () => {
        try {
          const userInfo = await EncryptedStorage.getItem("USER_AUTH_INFO");
          if (userInfo && userInfo !== null) {
            setSelf(JSON.parse(userInfo));
          } else {
            setSelf(null);
          }
        } catch (error) {
          console.error("Failed to load user info", error);
        }
      };

      loadUserInfo();

      onSet((newValue, _, isReset) => {
        const saveUserInfo = async () => {
          if (isReset || newValue === null) {
            await EncryptedStorage.removeItem("USER_AUTH_INFO");
          } else {
            await EncryptedStorage.setItem("USER_AUTH_INFO", JSON.stringify(newValue));
          }
        };

        saveUserInfo();
      });
    }
  ]
});
