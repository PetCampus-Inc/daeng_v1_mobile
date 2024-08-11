import React, { forwardRef, RefObject, useRef } from "react";
import ParentWebView, { WebViewProps as ParentWebViewProps } from "react-native-webview";

import { baseUrl } from "~/config/url";
import useBackHandler from "~/hooks/webview/useBackHandler";
import useWebviewLog from "~/hooks/webview/useWebviewLog";

interface Headers {
  [key: string]: string;
}

export interface WebViewProps extends ParentWebViewProps {
  path?: string;
  headers?: Headers;
}

const WebView = forwardRef<ParentWebView, WebViewProps>(
  ({ path = "", headers, onMessage, ...props }, ref) => {
    const localRef = useRef<ParentWebView>(null);
    const webviewRef = (ref as RefObject<ParentWebView>) || localRef;
    const fullPath = path.startsWith("/") ? path : `/${path}`;

    useBackHandler(webviewRef);
    const { debuggingScript, handleMessageInterceptor } = useWebviewLog(onMessage);

    return (
      <ParentWebView
        ref={webviewRef}
        className="flex-1"
        hideKeyboardAccessoryView={true}
        scalesPageToFit={false}
        automaticallyAdjustContentInsets={false}
        onMessage={handleMessageInterceptor}
        injectedJavaScript={debuggingScript}
        source={{ uri: `${baseUrl}${fullPath}`, headers }}
        {...props}
      />
    );
  }
);

export default WebView;
export type WebViewElement = ParentWebView;
