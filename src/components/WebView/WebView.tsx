import React, { forwardRef, RefObject, useEffect, useRef } from "react";
import { BackHandler, Dimensions } from "react-native";
import ParentWebView, { WebViewProps as ParentWebViewProps } from "react-native-webview";
import { StyledWebView } from "~/components/WebView/styles";
import { baseUrl } from "~/config/url";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface WebViewProps extends ParentWebViewProps {
  path?: string;
}

const WebView = forwardRef<ParentWebView, WebViewProps>(({ path = "", ...props }, ref) => {
  const localRef = useRef<ParentWebView>(null);
  const webviewRef = (ref as RefObject<ParentWebView>) || localRef;
  const fullPath = path.startsWith("/") ? path : `/${path}`;

  const handleBackPress = () => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    }
    return false;
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, []);

  return (
    <StyledWebView
      ref={webviewRef}
      windowWidth={windowWidth}
      windowHeight={windowHeight}
      webviewDebuggingEnabled={__DEV__}
      source={{ uri: `${baseUrl}${fullPath}` }}
      {...props}
    />
  );
});

export default WebView;
export type WebViewElement = ParentWebView;
