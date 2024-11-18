import { RefObject, useCallback } from "react";
import { getUniqueId } from "react-native-device-info";
import WebView from "react-native-webview";

import { useScanner } from "@_widgets/qr-scanner-modal";

import { SocialProvider, SocialAuthData, useFirebaseAuth } from "@_shared/lib/firebase/auth";
import { connectCall, runCamera, saveMedia, selectImage } from "@_shared/lib/native";
import {
  NativeActionResponse,
  NativeActionType,
  NativeActionRequest,
  NativeActionData
} from "@_shared/ui/webview";
import { getFcmToken } from "@_shared/utils/get-fcm-token";

interface ActionControllerOptions {
  /** `WebView`의 `RefObject` */
  webviewRef: RefObject<WebView>;
  /** 에러 발생 시 호출될 함수 */
  onError?: (message: string) => void;
}

/**
 * `WebView`에서 받은 `Action` 메시지를 처리하는 훅입니다. 요청을 처리한 뒤 응답을 보내는 양방향 통신입니다.
 * @param webviewRef `WebView`의 `RefObject`
 * @param onError 에러 발생 시 호출될 함수
 */
export const useActionController = ({ webviewRef, onError }: ActionControllerOptions) => {
  const { socialLogin } = useFirebaseAuth();
  const { openScanner } = useScanner();

  const postActionResponse = useCallback(
    (response: NativeActionResponse<NativeActionType>) => {
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
    async <T extends NativeActionType>(message: NativeActionRequest) => {
      const { id, action, payload } = message;

      try {
        let response: NativeActionData<T>["response"] = null;

        switch (action) {
          case "SAVE_MEDIA":
            await saveMedia(payload);
            break;
          case "SELECT_IMAGE":
            response = await selectImage();
            break;
          case "CALL":
            connectCall(payload);
            break;
          case "LAUNCH_CAMERA":
            response = await runCamera();
            break;
          case "QR_CODE_SCANNER":
            const result = await openScanner();
            response = JSON.parse(result);
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
        const errMsg = error instanceof Error ? error.message : "알 수 없는 오류";
        postActionResponse({ id, status: "ERROR", action, payload: errMsg });
        onError?.(errMsg);
      }
    },
    [postActionResponse, openScanner, onError, handleSocialLogin]
  );
};
