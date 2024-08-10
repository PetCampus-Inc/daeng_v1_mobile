import { useNavigation } from "@react-navigation/native";
import { RefObject, useCallback } from "react";
import WebView from "react-native-webview";

import useLogout from "~/hooks/auth/useLogout";
import useSaveImage from "~/hooks/native/useSaveImage";
import useSelectImage from "~/hooks/native/useSelectImage";
import usePostMessage from "~/hooks/webview/usePostMessage";
import { connectCall } from "~/native/call";
import { runCamera } from "~/native/camera";
import { MessageDataType, WebViewMessage } from "~/types/message.types";

interface MessageHandlerOptions {
  webviewRef: RefObject<WebView>;
  onSuccess?: (data: MessageDataType["Response"]) => void;
  onError?: (err: Error) => void;
}

const useMessageHandler = ({ webviewRef, onSuccess, onError }: MessageHandlerOptions) => {
  const { postMessage } = usePostMessage({ webviewRef });
  const { save } = useSaveImage();
  const { select } = useSelectImage();
  const navigation = useNavigation();
  const logout = useLogout();

  const messageHandler = useCallback(
    async ({ type, data, requestId }: WebViewMessage) => {
      try {
        let response: MessageDataType["Response"];

        switch (type) {
          case "SAVE_IMAGE":
            response = await save(data);
            break;
          case "SELECT_IMAGE":
            response = await select();
            break;
          case "CALL":
            connectCall(data);
            response = null;
            break;
          case "LAUNCH_CAMERA":
            response = await runCamera();
            break;
          case "GO_BACK":
            navigation.canGoBack() && navigation.goBack();
            response = null;
            break;
          case "LOGOUT":
            logout();
            response = null;
            break;
          default:
            throw new Error(`지원하지 않는 메세지 타입입니다. [${type}]`);
        }

        postMessage(type, response, requestId);
        onSuccess?.(response);
      } catch (error) {
        const newError = error instanceof Error ? error : new Error(String(error));
        postMessage("ERROR", newError.message, requestId);
        onError?.(newError);
      }
    },
    [navigation, postMessage, save, select, onSuccess, onError, logout]
  );

  return { messageHandler };
};

export default useMessageHandler;
