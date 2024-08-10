import React, { forwardRef } from "react";
import { KeyboardAvoidingView } from "react-native";

import WebView, { WebViewElement, WebViewProps } from "~/components/WebView";
import useKeyboardAvoiding from "~/hooks/useKeyboardAvoiding";

const KeyboardAvoidingWebView = forwardRef<WebViewElement, WebViewProps>((webviewProps, ref) => {
  const keyboardAvoidingProps = useKeyboardAvoiding(0);

  return (
    <KeyboardAvoidingView className="flex-1 bg-white" {...keyboardAvoidingProps}>
      <WebView ref={ref} {...webviewProps} />
    </KeyboardAvoidingView>
  );
});

export default KeyboardAvoidingWebView;
