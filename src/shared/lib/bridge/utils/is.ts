import { WebViewMessage } from "../types";

export const isWebViewMessage = (message: unknown): message is WebViewMessage => {
  return (
    typeof message === "object" && message !== null && "type" in message && "payload" in message
  );
};
