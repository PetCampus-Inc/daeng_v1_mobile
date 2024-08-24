import { RefObject, useCallback } from "react";
import { getUniqueId } from "react-native-device-info";
import WebView from "react-native-webview";
import { useRecoilValue } from "recoil";

import useFirebaseAuth from "~/hooks/auth/useFirebaseAuth";
import useSaveImage from "~/hooks/native/useSaveImage";
import useSelectImage from "~/hooks/native/useSelectImage";
import { connectCall } from "~/native/call";
import { runCamera } from "~/native/camera";
import { fcmTokenState } from "~/store/fcmToken";
import { ActionData, ActionRequest, ActionResponse, ActionType } from "~/types/action";
import { SocialAuthData, SocialProvider } from "~/types/auth.types";

interface ActionOptions {
  webviewRef: RefObject<WebView>;
  onError?: (err: Error) => void;
}

const useAction = ({ webviewRef, onError }: ActionOptions) => {
  const fcmToken = useRecoilValue(fcmTokenState);

  const { save } = useSaveImage();
  const { select } = useSelectImage();
  const { socialLogin } = useFirebaseAuth();

  const postActionResponse = useCallback(
    (response: ActionResponse<ActionType>) => {
      if (webviewRef.current) {
        const message = JSON.stringify(response);
        webviewRef.current.postMessage(message);
      } else if (onError) onError(new Error("WebView 참조를 찾을 수 없습니다."));
    },
    [webviewRef, onError]
  );

  return useCallback(
    async <T extends ActionType>(message: ActionRequest<T>) => {
      const { id, action, payload } = message;

      const handleSocialLogin = async (provider: SocialProvider): Promise<SocialAuthData> => {
        if (!fcmToken) throw new Error("FCM 토큰이 없습니다.");
        return {
          idToken: await socialLogin(provider),
          deviceId: await getUniqueId(),
          fcmToken
        };
      };

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
            if (!fcmToken) throw new Error("FCM 토큰이 없습니다.");
            response = fcmToken;
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
    [postActionResponse, save, select, onError, socialLogin, fcmToken]
  );
};

export default useAction;
