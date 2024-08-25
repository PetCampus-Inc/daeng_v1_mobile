import React, { useRef } from "react";
import SplashScreen from "react-native-splash-screen";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { type WebViewElement } from "~/components/WebView";
import useTokenCookieManager from "~/hooks/auth/useTokenCookieManager";
import usePushNotification from "~/hooks/usePushNotification";
import useActionController from "~/hooks/webview/useActionController";
import useMessageController from "~/hooks/webview/useMessageController";
import useMessageDispatcher from "~/hooks/webview/useMessageDispatcher";
import usePostMessage from "~/hooks/webview/usePostMessage";

const HomeScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  const postMessage = usePostMessage({ webviewRef });
  const onMessage = useMessageController();
  const onAction = useActionController({ webviewRef });
  const handleMessage = useMessageDispatcher({ onMessage, onAction });

  useTokenCookieManager();
  usePushNotification({
    onMessage: (message) => postMessage("NEW_NOTIFICATION", message),
    onNotificationOpenedApp: (message) => postMessage("PUSH_NOTIFICATION", message)
  });

  return (
    <KeyboardAvoidingWebView
      className="flex-1"
      ref={webviewRef}
      onMessage={handleMessage}
      onLoadEnd={() => SplashScreen.hide()}
    />
  );
};

export default HomeScreen;
