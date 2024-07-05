import { RefObject, useCallback } from "react";
import WebView from "react-native-webview";

export interface ReactNativeMessage {
  type: string;
  data: string;
}

interface PostMessageParams {
  webviewRef: RefObject<WebView>;
  onComplete?: () => void;
  onError?: (err: string) => void;
}

export const usePostMessage = ({ onComplete, onError, webviewRef }: PostMessageParams) => {
  const post = useCallback(
    (message: ReactNativeMessage) => {
      if (webviewRef.current) {
        webviewRef.current.postMessage(JSON.stringify(message));
      } else {
        const errMsg = "WebView 참조를 찾을 수 없습니다.";
        console.error("[WebView 통신 오류] :", errMsg);
        onError?.(errMsg);
      }
    },
    [webviewRef, onComplete, onError]
  );

  return { post };
};
