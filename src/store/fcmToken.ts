import { atom } from "recoil";

export const fcmTokenState = atom<string | null>({
  key: "fcmTokenState",
  default: null
});
