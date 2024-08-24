import { useCallback } from "react";
import { WebViewMessageEvent } from "react-native-webview";

import { ActionRequest, ActionType } from "~/types/action";
import { WebViewMessageRequest, WebViewMessageType } from "~/types/message.types";
import { isActionRequest } from "~/utils/is/action";
import { isWebViewMessageRequest } from "~/utils/is/message";

interface WebViewMessageHandlerOptions {
  /** WebView로 부터 메세지를 받으면 호출 됩니다. */
  onMessage?: (message: WebViewMessageRequest<WebViewMessageType<"Request">>) => void;
  /** WebView로 부터 액션 메세지를 받으면 호출 됩니다. */
  onAction?: (message: ActionRequest<ActionType>) => void;
  /** WebView 통신 중 오류가 발생하면 호출 됩니다. */
  onError?: (err: Error) => void;
}

const useWebViewMessageHandler = ({
  onMessage,
  onAction,
  onError
}: WebViewMessageHandlerOptions) => {
  return useCallback(
    (event: WebViewMessageEvent) => {
      try {
        const message = JSON.parse(event.nativeEvent.data);

        if (isWebViewMessageRequest(message) && onMessage) onMessage(message);
        else if (isActionRequest(message) && onAction) onAction(message);
        else throw new Error("올바르지 않은 메세지 형식입니다.");
      } catch (error: unknown) {
        const errMsg = error instanceof Error ? error : new Error("알 수 없는 오류 발생");
        console.error("[Webview 통신 오류] :", errMsg);
        onError?.(errMsg);
      }
    },
    [onMessage, onAction, onError]
  );
};

export default useWebViewMessageHandler;
