import { RefObject } from "react";
import WebView from "react-native-webview";
import { PostMessage, PostMessageType } from "~/types/message.types";

interface PostMessageParams {
  webviewRef: RefObject<WebView>;
  onError?: (err: string) => void;
}

export const usePostMessage = ({ onError, webviewRef }: PostMessageParams) => {
  const post = <T extends PostMessageType>(type: T, data: PostMessage[T]) => {
    if (webviewRef.current) {
      const message = JSON.stringify({ type, data });
      webviewRef.current.postMessage(message);
    } else {
      const errMsg = "WebView 참조를 찾을 수 없습니다.";
      console.error("[WebView 통신 오류] :", errMsg);
      onError?.(errMsg);
    }
  };

  return { post };
};
