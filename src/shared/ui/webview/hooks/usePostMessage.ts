import { RefObject, useCallback } from "react";
import WebView from "react-native-webview";

import { WebViewMessageData, WebViewMessageType } from "../types/message";

interface PostMessageParams {
  /** `WebView`의 `RefObject` */
  webviewRef: RefObject<WebView>;
  /** 에러 발생 시 호출될 함수 */
  onError?: (err: Error) => void;
}

/**
 * `WebView`에 메시지를 보내는 훅입니다.
 * @param webviewRef `WebView`의 `RefObject`
 * @param onError 에러 발생 시 호출될 함수
 */
export const usePostMessage = ({ webviewRef, onError }: PostMessageParams) => {
  return useCallback(
    <T extends WebViewMessageType<"Response">>(
      type: T,
      data: WebViewMessageData<"Response", T>
    ) => {
      if (webviewRef.current) {
        const message = JSON.stringify({ type, data });
        webviewRef.current.postMessage(message);
      } else onError?.(new Error("WebView 참조를 찾을 수 없습니다."));
    },
    [webviewRef, onError]
  );
};
