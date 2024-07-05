import { useCallback } from "react";
import { WebViewMessageEvent, WebViewProps } from "react-native-webview";

export interface WebViewMessage {
  type: string;
  data: any;
}

interface WebViewMessageParams {
  onError?: (err: string) => void;
  onSubscribe?: (message: WebViewMessage) => void;
}

export const useWebViewMessage = ({ onSubscribe, onError }: WebViewMessageParams = {}) => {
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
