import React, { useRef } from "react";
import SplashScreen from "react-native-splash-screen";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { WebViewElement } from "~/components/WebView";
import useMessageHandler from "~/hooks/webview/useMessageHandler";
import useWebViewMessage from "~/hooks/webview/useWebViewMessage";

const AdminScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  const { messageHandler } = useMessageHandler({ webviewRef });
  const { handleMessage } = useWebViewMessage({ onSubscribe: messageHandler });

  return (
    <KeyboardAvoidingWebView
      ref={webviewRef}
      path="/admin/login"
      onMessage={handleMessage}
      onLoadEnd={() => SplashScreen.hide()}
    />
  );
};

export default AdminScreen;
