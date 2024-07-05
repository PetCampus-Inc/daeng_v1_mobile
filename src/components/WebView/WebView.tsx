import React from "react";

import { ElementRef, RefObject, useEffect, useRef } from "react";
import { BackHandler, Dimensions } from "react-native";
import ParentWebView, { WebViewProps as ParentWebViewProps } from "react-native-webview";
import { baseUrl } from "@config/url";
import * as S from "./styles";

const windowWidth = Dimensions.get("window").width;
const windowHeight = Dimensions.get("window").height;

interface WebViewProps extends ParentWebViewProps {
  webviewRef?: RefObject<ParentWebView>;
  path?: string;
}

const WebView = ({ webviewRef, path, ...props }: WebViewProps) => {
  const webview = webviewRef ? webviewRef : useRef<ParentWebView>(null);
  const pathSlash = path ? (path.startsWith("/") ? path : `/${path}`) : "";

  const onPressHardwareBackButton = () => {
    if (webview.current) {
      console.log(webview.current.state);
      webview.current.goBack();
      return true;
    } else {
      return false;
    }
  };

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", onPressHardwareBackButton);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", onPressHardwareBackButton);
    };
  }, []);

  return (
    <S.WebView
      ref={webview}
      windowWidth={windowWidth}
      windowHeight={windowHeight}
      webviewDebuggingEnabled={__DEV__ ? true : false}
      source={{
        uri: baseUrl + pathSlash
      }}
      {...props}
    />
  );
};

type WebViewRef = ElementRef<typeof WebView>;

export { WebView, type WebViewRef };
