import { useCallback } from "react";

import useLogout from "~/hooks/auth/useLogout";
import useTokenCookieManager from "~/hooks/auth/useTokenCookieManager";
import useUser from "~/hooks/auth/useUser";
import { User } from "~/types/auth.types";
import { WebViewMessageRequest, WebViewMessageType } from "~/types/message.types";

interface MessageControllerOptions {
  /** 에러 발생 시 호출될 함수 */
  onError?: (message: string) => void;
}

/**
 * `WebView`에서 받은 메시지를 처리하는 훅입니다.
 * @param onError 에러 발생 시 호출될 함수
 */
export default function useMessageController({ onError }: MessageControllerOptions = {}) {
  const logout = useLogout();
  const { setUser } = useUser();
  const { extractAndSaveRefreshToken } = useTokenCookieManager();

  const handleLogin = useCallback(
    async (user: User) => {
      await setUser(user);
      await extractAndSaveRefreshToken();
    },
    [setUser, extractAndSaveRefreshToken]
  );

  return useCallback(
    async <T extends WebViewMessageType<"Request">>(message: WebViewMessageRequest<T>) => {
      const { type, data } = message;

      try {
        switch (type) {
          case "LOGIN_SUCCESS":
            handleLogin(data);
            break;
          case "REFRESH_TOKEN":
            extractAndSaveRefreshToken();
            break;
          case "LOGOUT":
            logout();
            break;
          default:
            throw new Error(`지원하지 않는 메세지 타입입니다. [${type}]`);
        }
      } catch (error) {
        const errMsg = error instanceof Error ? error.message : "알 수 없는 오류";
        console.error("[MessageController]", errMsg);
        onError?.(errMsg);
      }
    },
    [onError, handleLogin, extractAndSaveRefreshToken, logout]
  );
}
