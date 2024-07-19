import { RefObject, useCallback } from "react";
import { getUniqueId } from "react-native-device-info";
import WebView from "react-native-webview";

import usePostMessage from "~/hooks/usePostMessage";
import useSaveImage from "~/hooks/useSaveImage";
import useSelectImage from "~/hooks/useSelectImage";
import { MessageDataType, WebViewMessage } from "~/types/message.types";

interface MessageHandlerOptions {
  webviewRef: RefObject<WebView>;
  token: string;
  onSuccess?: (data: MessageDataType["Response"]) => void;
  onError?: (err: Error) => void;
}

const useMessageHandler = ({ webviewRef, token, onSuccess, onError }: MessageHandlerOptions) => {
  const { postMessage } = usePostMessage({ webviewRef });
  const { save } = useSaveImage();
  const { select } = useSelectImage();

  const handler = useCallback(
    async ({ type, data }: WebViewMessage) => {
      try {
        let response: MessageDataType["Response"];

        switch (type) {
          case "SAVE_IMAGE":
            response = await save(data);
            break;
          case "SELECT_IMAGE":
            response = await select();
            break;
          case "GET_ID_TOKEN":
            response = token;
            break;
          case "GET_DEVICE_ID":
            response = await getUniqueId();
            break;
          default:
            throw new Error(`지원하지 않는 메세지 타입입니다. [${type}]`);
        }

        postMessage(type, response);
        onSuccess?.(response);
      } catch (error) {
        const newError = error instanceof Error ? error : new Error(String(error));
        onError?.(newError);
      }
    },
    [token, postMessage, save, select, onSuccess, onError]
  );

  return { handler };
};

export default useMessageHandler;
