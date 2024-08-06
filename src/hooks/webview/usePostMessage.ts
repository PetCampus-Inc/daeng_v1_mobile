import { WebViewElement } from "~/components/WebView";
import { MessageData, MessageType } from "~/types/message.types";

interface PostMessageParams {
  webviewRef: React.RefObject<WebViewElement>;
  onError?: (err: Error) => void;
}

const usePostMessage = ({ webviewRef, onError }: PostMessageParams) => {
  const postMessage = <T extends MessageType["Response"]>(
    type: T,
    data: MessageData["Response"][T],
    requestId?: string
  ) => {
    if (webviewRef.current) {
      const message = JSON.stringify({ type, data, requestId: requestId ?? type });
      webviewRef.current.postMessage(message);
    } else {
      onError?.(new Error("WebView 참조를 찾을 수 없습니다."));
    }
  };

  return { postMessage };
};

export default usePostMessage;
