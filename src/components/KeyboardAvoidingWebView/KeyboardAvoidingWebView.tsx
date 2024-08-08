import React, { forwardRef } from "react";
import { KeyboardAvoidingView } from "react-native";

import WebView, { WebViewElement, WebViewProps } from "~/components/WebView";
import useKeyboardAvoiding from "~/hooks/useKeyboardAvoiding";

const KeyboardAvoidingWebView = forwardRef<WebViewElement, WebViewProps>((webviewProps, ref) => {
  const keyboardAvoidingProps = useKeyboardAvoiding();

  return (
    <KeyboardAvoidingView className="flex-1" {...keyboardAvoidingProps}>
      <WebView ref={ref} {...webviewProps} />
    </KeyboardAvoidingView>
  );
});

export default KeyboardAvoidingWebView;
