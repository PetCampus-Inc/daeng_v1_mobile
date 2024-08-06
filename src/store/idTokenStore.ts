import { atom } from "recoil";

export const idTokenState = atom<string | null>({
  key: "idTokenState",
  default: null
});
