import React, { forwardRef, RefObject, useRef } from "react";
import { Dimensions } from "react-native";
import ParentWebView, { WebViewProps as ParentWebViewProps } from "react-native-webview";

import { baseUrl } from "~/config/url";
import useBackHandler from "~/hooks/webview/useBackHandler";
import useWebviewLog from "~/hooks/webview/useWebviewLog";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

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
        style={{ width: windowWidth, height: windowHeight }}
        hideKeyboardAccessoryView={true}
        scalesPageToFit={false}
        automaticallyAdjustContentInsets={false}
        webviewDebuggingEnabled={__DEV__}
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
