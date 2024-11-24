import React, { forwardRef, RefObject, useRef } from "react";

import { useQRScanner } from "@_shared/hooks/use-qr-scanner";
import { useBridge, INJECT_DEBUGGING_SCRIPT } from "@_shared/lib/bridge";
import { WebView, WebViewProps } from "@_shared/ui/webview";

import { webViewBridge } from "../lib/bridge";

interface BridgeWebViewProps extends WebViewProps {
  onMessage?: (message: unknown) => void;
}

export const BridgeWebView = forwardRef<WebView, BridgeWebViewProps>(
  ({ onMessage, ...props }, ref) => {
    const localRef = useRef<WebView>(null);
    const webviewRef = (ref as RefObject<WebView>) || localRef;

    const { openQRScanner } = useQRScanner();
    const bridgeWithHookMethod = { openQRScanner, ...webViewBridge };

    const { handleMessage } = useBridge({
      bridge: bridgeWithHookMethod,
      webviewRef,
      onMessage
    });

    return (
      <WebView
        ref={webviewRef}
        injectedJavaScript={INJECT_DEBUGGING_SCRIPT}
        onMessage={handleMessage}
        {...props}
      />
    );
  }
);
