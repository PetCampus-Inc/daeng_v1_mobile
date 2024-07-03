import WebView from "react-native-webview";
import { RefObject, useCallback } from "react";
import { WebViewMessageEvent, WebViewProps } from "react-native-webview";

export interface WebViewMessage {
  type: string;
  data: string;
}

export interface ReactNativeMessage {
  type: string;
  data: string;
}

interface WebViewMessageParams {
  webviewRef?: RefObject<WebView>;
  onError?: (err: string) => void;
  onSubscribe?: (message: WebViewMessage) => void;
}

export const useWebViewMessage = ({
  webviewRef,
  onSubscribe,
  onError
}: WebViewMessageParams = {}) => {
  const webview = webviewRef ? webviewRef.current : null;

  const onMessage: WebViewProps["onMessage"] = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const res: WebViewMessage = JSON.parse(event.nativeEvent.data);

        onSubscribe?.({ type: res.type, data: res.data });
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : "알 수 없는 오류 발생";

        console.error("[Webview 통신 오류] :", errMsg);
        onError?.(errMsg);
      }
    },
    [onSubscribe, onError]
  );

  return { onMessage };
};
