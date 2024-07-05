import { RefObject } from "react";
import WebView from "react-native-webview";
import { PostMessage } from "~/types/postMessage";

interface PostMessageParams {
  webviewRef: RefObject<WebView>;
  onError?: (err: string) => void;
}

export const usePostMessage = ({ onError, webviewRef }: PostMessageParams) => {
  const post = (message: PostMessage) => {
    if (webviewRef.current) {
      webviewRef.current.postMessage(JSON.stringify(message));
    } else {
      const errMsg = "WebView 참조를 찾을 수 없습니다.";
      console.error("[WebView 통신 오류] :", errMsg);
      onError?.(errMsg);
    }
  };

  return { post };
};
