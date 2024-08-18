import { RefObject, useCallback } from "react";
import { getUniqueId } from "react-native-device-info";
import WebView from "react-native-webview";

import useFirebaseAuth from "~/hooks/auth/useFirebaseAuth";
import useSaveImage from "~/hooks/native/useSaveImage";
import useSelectImage from "~/hooks/native/useSelectImage";
import usePostMessage from "~/hooks/webview/usePostMessage";
import { connectCall } from "~/native/call";
import { runCamera } from "~/native/camera";
import { MessageDataType, WebViewMessage } from "~/types/message.types";

interface MessageHandlerOptions {
  webviewRef: RefObject<WebView>;
  onCallback?: (message: WebViewMessage) => void;
  onSuccess?: (data: MessageDataType["Response"]) => void;
  onError?: (err: Error) => void;
}

const useMessageHandler = ({
  webviewRef,
  onSuccess,
  onError,
  onCallback
}: MessageHandlerOptions) => {
  const { postMessage } = usePostMessage({ webviewRef });
  const { save } = useSaveImage();
  const { select } = useSelectImage();

  const { socialLogin } = useFirebaseAuth();

  const messageHandler = useCallback(
    async (message: WebViewMessage) => {
      try {
        let response: MessageDataType["Response"] = null;

        if (onCallback) onCallback(message);

        const { type, data, requestId } = message;

        switch (type) {
          case "SAVE_IMAGE":
            await save(data);
            break;
          case "SELECT_IMAGE":
            response = await select();
            break;
          case "CALL":
            connectCall(data);
            break;
          case "LAUNCH_CAMERA":
            response = await runCamera();
            break;
          case "SOCIAL_LOGIN":
            response = {
              idToken: await socialLogin(data),
              deviceId: await getUniqueId()
            };
            break;
          default:
            throw new Error(`지원하지 않는 메세지 타입입니다. [${type}]`);
        }

        postMessage(type, response, requestId);
        onSuccess?.(response);
      } catch (error) {
        const newError = error instanceof Error ? error : new Error(String(error));
        postMessage("ERROR", newError.message, message.requestId);
        onError?.(newError);
      }
    },
    [postMessage, save, select, onCallback, onSuccess, onError, socialLogin]
  );

  return { messageHandler };
};

export default useMessageHandler;
