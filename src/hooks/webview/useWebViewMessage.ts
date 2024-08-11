import { RefObject, useCallback } from "react";
import WebView, { WebViewMessageEvent, WebViewProps } from "react-native-webview";

import useMessageHandler from "./useMessageHandler";

import { WebViewMessage } from "~/types/message.types";
import { isValidMessageData, isWebViewMessage } from "~/utils/is";

interface WebViewMessageParams {
  webviewRef: RefObject<WebView>;
  onError?: (err: Error) => void;
  onCallback?: (message: WebViewMessage) => void;
}

const useWebViewMessage = ({ webviewRef, onCallback, onError }: WebViewMessageParams) => {
  const { messageHandler } = useMessageHandler({ webviewRef, onCallback, onError });

  const handleMessage: WebViewProps["onMessage"] = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const message = JSON.parse(event.nativeEvent.data);

        if (!isWebViewMessage(message)) {
          throw new Error("[Native 통신 오류]: 메시지 타입 오류");
        }

        if (!isValidMessageData(message)) {
          throw new Error("[Native 통신 오류]: 데이터 타입 오류");
        }

        messageHandler(message);
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error : new Error("알 수 없는 오류 발생");
        console.error("[Webview 통신 오류] :", errMsg);
        onError?.(errMsg);
      }
    },
    [messageHandler, onError]
  );

  return { handleMessage };
};

export default useWebViewMessage;
