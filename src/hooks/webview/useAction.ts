import { RefObject, useCallback } from "react";
import { getUniqueId } from "react-native-device-info";
import WebView from "react-native-webview";

import useFirebaseAuth from "~/hooks/auth/useFirebaseAuth";
import useSaveImage from "~/hooks/native/useSaveImage";
import useSelectImage from "~/hooks/native/useSelectImage";
import { connectCall } from "~/native/call";
import { runCamera } from "~/native/camera";
import { ActionData, ActionRequest, ActionResponse, ActionType } from "~/types/action";
import { SocialAuthData, SocialProvider } from "~/types/auth.types";
import getFcmToken from "~/utils/getFcmToken";

interface ActionOptions {
  webviewRef: RefObject<WebView>;
  onError?: (err: Error) => void;
}

const useAction = ({ webviewRef, onError }: ActionOptions) => {
  const { save } = useSaveImage();
  const { select } = useSelectImage();
  const { socialLogin } = useFirebaseAuth();

  const postActionResponse = useCallback(
    (response: ActionResponse<ActionType>) => {
      if (!webviewRef.current) throw new Error("WebView 참조를 찾을 수 없습니다.");
      const message = JSON.stringify(response);
      webviewRef.current.postMessage(message);
    },
    [webviewRef]
  );

  const handleSocialLogin = useCallback(
    async (provider: SocialProvider): Promise<SocialAuthData> => {
      const [idToken, deviceId, fcmToken] = await Promise.all([
        socialLogin(provider),
        getUniqueId(),
        getFcmToken()
      ]);
      return { idToken, deviceId, fcmToken };
    },
    [socialLogin]
  );

  return useCallback(
    async <T extends ActionType>(message: ActionRequest<T>) => {
      const { id, action, payload } = message;

      try {
        let response: ActionData<T>["response"] = null;

        switch (action) {
          case "SAVE_IMAGE":
            await save(payload);
            break;
          case "SELECT_IMAGE":
            response = await select();
            break;
          case "CALL":
            connectCall(payload);
            break;
          case "LAUNCH_CAMERA":
            response = await runCamera();
            break;
          case "SOCIAL_LOGIN":
            response = await handleSocialLogin(payload);
            break;
          case "FCM_TOKEN":
            response = await getFcmToken();
            break;
          default:
            throw new Error(`지원하지 않는 메세지 타입입니다. [${action}]`);
        }

        postActionResponse({ id, status: "SUCCESS", action, payload: response });
      } catch (error) {
        const newError = error instanceof Error ? error : new Error(String(error));
        postActionResponse({ id, status: "ERROR", action, payload: newError.message });
        onError?.(newError);
      }
    },
    [postActionResponse, save, select, onError, handleSocialLogin]
  );
};

export default useAction;
