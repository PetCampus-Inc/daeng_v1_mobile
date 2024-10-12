import { useCallback } from "react";

import { useLogout, useTokenCookieManager } from "@_shared/hooks/auth";

import { WebViewMessageRequest, WebViewMessageType } from "../types/message";

interface MessageControllerOptions {
  /** 에러 발생 시 호출될 함수 */
  onError?: (message: string) => void;
}

/**
 * `WebView`에서 받은 메시지를 처리하는 훅입니다.
 * @param onError 에러 발생 시 호출될 함수
 */
export const useMessageController = ({ onError }: MessageControllerOptions = {}) => {
  const logout = useLogout();
  const { extractAndSaveRefreshToken } = useTokenCookieManager();

  return useCallback(
    async <T extends WebViewMessageType<"Request">>(message: WebViewMessageRequest<T>) => {
      const { type, data } = message;

      try {
        switch (type) {
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
    [onError, extractAndSaveRefreshToken, logout]
  );
};
