import { atom } from "recoil";

interface WebRouteState {
  url: string;
  canGoBack: boolean;
}

export const webRouteState = atom<WebRouteState>({
  key: "webRouteState",
  default: {
    url: "/",
    canGoBack: false
  }
});
