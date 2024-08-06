import React, { forwardRef, useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, NativeModules } from "react-native";

import WebView, { WebViewElement, WebViewProps } from "~/components/WebView";

const { StatusBarManager } = NativeModules;

const KeyboardAvoidingWebView = forwardRef<WebViewElement, WebViewProps>((webviewProps, ref) => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === "ios") {
      StatusBarManager.getHeight((statusBarFrameData: { height: React.SetStateAction<number> }) => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, []);

  return (
    <KeyboardAvoidingView
      className="flex-1"
      keyboardVerticalOffset={statusBarHeight}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <WebView ref={ref} {...webviewProps} />
    </KeyboardAvoidingView>
  );
});

export default KeyboardAvoidingWebView;
