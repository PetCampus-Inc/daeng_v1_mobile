import { useCallback } from "react";
import { WebViewMessageEvent, WebViewProps } from "react-native-webview";

import { MessageType, WebViewMessage } from "~/types/message.types";
import { isValidMessageData, isWebViewMessage } from "~/utils/is";

interface WebViewMessageParams {
  onSubscribe?: <T extends MessageType["Request"]>(message: WebViewMessage<T>) => void;
  onError?: (err: string) => void;
}

export const useWebViewMessage = ({ onSubscribe, onError }: WebViewMessageParams) => {
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

        onSubscribe?.(message);
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error.message : "알 수 없는 오류 발생";
        console.error("[Webview 통신 오류] :", errMsg);
        onError?.(errMsg);
      }
    },
    [onSubscribe, onError]
  );

  return { handleMessage };
};
