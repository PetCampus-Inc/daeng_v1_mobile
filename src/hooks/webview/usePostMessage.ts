import { useCallback } from "react";

import { WebViewElement } from "~/components/WebView";
import { WebViewMessageData, WebViewMessageType } from "~/types/message.types";

interface PostMessageParams {
  webviewRef: React.RefObject<WebViewElement>;
  onError?: (err: Error) => void;
}

const usePostMessage = ({ webviewRef, onError }: PostMessageParams) => {
  return useCallback(
    <T extends WebViewMessageType<"Response">>(
      type: T,
      data: WebViewMessageData<"Response", T>
    ) => {
      if (webviewRef.current) {
        const message = JSON.stringify({ type, data });
        webviewRef.current.postMessage(message);
      } else onError?.(new Error("WebView 참조를 찾을 수 없습니다."));
    },
    [webviewRef, onError]
  );
};

export default usePostMessage;
