import { atom } from "recoil";

interface WebNavigationState {
  url: string;
  canGoBack: boolean;
}

export const webNavigationState = atom<WebNavigationState>({
  key: "webNavigationState",
  default: {
    url: "/",
    canGoBack: false
  }
});
