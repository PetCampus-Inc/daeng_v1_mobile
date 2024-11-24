import { RefObject } from "react";
import WebView from "react-native-webview";

/**
 * WebView에 메시지를 보냅니다.
 * @param webviewRef WebView RefObject
 * @param payload 메시지 페이로드
 */
export const postMessage = (webviewRef: RefObject<WebView>, payload: unknown) => {
  const webview = webviewRef.current;
  const message = JSON.stringify({ type: "MESSAGE", payload });

  if (!webview) return;

  webview.postMessage(message);
};
