import { RefObject } from "react";
import WebView, { WebViewMessageEvent } from "react-native-webview";

import { handleBridge } from "../lib/handleBridge";
import { handleWebViewLog } from "../lib/handleWebViewLog";
import { Bridge } from "../types";
import { isWebViewMessage } from "../utils/is";

interface BridgeOptions {
  bridge: Bridge;
  webviewRef: RefObject<WebView>;
  onMessage?: (message: unknown) => void;
}

export const useBridge = ({ bridge, webviewRef, onMessage }: BridgeOptions) => {
  /** WebView 메시지 처리 */
  const handleMessage = async (event: WebViewMessageEvent) => {
    const message = JSON.parse(event.nativeEvent.data);

    if (!isWebViewMessage(message)) {
      onMessage?.(message);
      return;
    }

    const { type, payload } = message;

    switch (type) {
      case "BRIDGE":
        await handleBridge({ webviewRef, bridge, payload });
        break;
      case "MESSAGE":
        onMessage?.(payload);
        break;
      case "LOG":
        handleWebViewLog(payload);
        break;
    }
  };

  return { handleMessage };
};
