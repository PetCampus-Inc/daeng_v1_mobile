import { RefObject } from "react";
import WebView from "react-native-webview";

import { Bridge, BridgePayload, BridgeResponsePayload } from "../types";

interface HandleBridgeOptions {
  webviewRef: RefObject<WebView>;
  bridge: Bridge;
  payload: BridgePayload;
}

/**
 * WebView Bridge 핸들러
 * @param webviewRef - `WebView`
 * @param bridge - `Bridge` 메소드 객체
 * @param payload - `Bridge` 페이로드
 */
export const handleBridge = async ({ webviewRef, bridge, payload }: HandleBridgeOptions) => {
  const { id, method, args = [] } = payload;

  /** Bridge 응답 전송 */
  const postBridgeResponse = (payload: BridgeResponsePayload) => {
    if (!webviewRef.current) throw new Error("WebView 참조를 찾을 수 없습니다.");

    const messageString = JSON.stringify({ type: "BRIDGE", payload });
    webviewRef.current.postMessage(messageString);
  };

  try {
    if (!(method in bridge)) {
      throw new Error(`[${method}] 메소드를 찾을 수 없습니다.`);
    }

    const bridgeMethod = bridge[method];
    const response = await bridgeMethod(...args);

    postBridgeResponse({ id, method, response, status: "success" });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "알 수 없는 오류가 발생했습니다.";

    postBridgeResponse({ id, method, response: errorMessage, status: "error" });
  }
};
