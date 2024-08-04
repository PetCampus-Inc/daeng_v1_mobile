import React, { forwardRef, RefObject, useCallback, useEffect, useRef } from "react";
import { BackHandler, Dimensions } from "react-native";
import ParentWebView, { WebViewProps as ParentWebViewProps } from "react-native-webview";

import { StyledWebView } from "~/components/WebView/styles";
import { baseUrl } from "~/config/url";
import useWebViewDebugging from "~/hooks/useWebViewDebugging";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface WebViewProps extends ParentWebViewProps {
  path?: string;
}

const WebView = forwardRef<ParentWebView, WebViewProps>(
  ({ path = "", onMessage, ...props }, ref) => {
    const localRef = useRef<ParentWebView>(null);
    const webviewRef = (ref as RefObject<ParentWebView>) || localRef;
    const fullPath = path.startsWith("/") ? path : `/${path}`;

    const { debuggingScript, handleMessageInterceptor } = useWebViewDebugging(onMessage);

    const handleBackPress = useCallback(() => {
      if (webviewRef.current) {
        webviewRef.current.goBack();
        return true;
      }
      return false;
    }, [webviewRef]);

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackPress);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
      };
    }, [handleBackPress]);

    return (
      <StyledWebView
        ref={webviewRef}
        hideKeyboardAccessoryView={true}
        windowWidth={windowWidth}
        windowHeight={windowHeight}
        webviewDebuggingEnabled={__DEV__}
        onMessage={handleMessageInterceptor}
        injectedJavaScript={debuggingScript}
        source={{ uri: `${baseUrl}${fullPath}` }}
        {...props}
      />
    );
  }
);

export default WebView;
export type WebViewElement = ParentWebView;
