import React, { useRef } from "react";
import SplashScreen from "react-native-splash-screen";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { type WebViewElement } from "~/components/WebView";
import usePushNotification from "~/hooks/usePushNotification";
import useAction from "~/hooks/webview/useAction";
import usePostMessage from "~/hooks/webview/usePostMessage";
import useWebViewMessageHandler from "~/hooks/webview/useWebViewMessageHandler";

const HomeScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  const postMessage = usePostMessage({ webviewRef });
  const onAction = useAction({ webviewRef });
  const handleMessage = useWebViewMessageHandler({ onAction });

  usePushNotification({
    onMessage: (message) => postMessage("NEW_NOTIFICATION", message),
    onNotificationOpenedApp: (message) => postMessage("PUSH_NOTIFICATION", message)
  });

  return (
    <KeyboardAvoidingWebView
      className="flex-1"
      ref={webviewRef}
      onMessage={handleMessage}
      sharedCookiesEnabled={true}
      onLoadEnd={() => SplashScreen.hide()}
    />
  );
};

export default HomeScreen;
