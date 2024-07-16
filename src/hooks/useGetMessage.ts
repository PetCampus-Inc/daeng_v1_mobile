import { useCallback } from "react";
import { WebViewMessageEvent, WebViewProps } from "react-native-webview";

import { MessageType, WebViewMessageGet, isValidGetMessage } from "~/types/message.types";

interface GetMessageOptions {
  onSubscribe?: <T extends MessageType["GET"]>(message: WebViewMessageGet<T>) => void;
  onError?: (err: string) => void;
}

const useGetMessage = ({ onSubscribe, onError }: GetMessageOptions = {}) => {
  const onMessage: WebViewProps["onMessage"] = useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const response = JSON.parse(event.nativeEvent.data);

        if (onSubscribe && isValidGetMessage(response)) onSubscribe(response);
        else throw new Error("메세지 타입 또는 데이터 오류");
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

export default useGetMessage;
