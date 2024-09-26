import React, { useRef } from "react";
import SplashScreen from "react-native-splash-screen";
import { WebViewNavigation } from "react-native-webview";
import { useSetRecoilState } from "recoil";

import { useTokenCookieManager } from "@_shared/hooks/auth";
import { usePushNotification } from "@_shared/lib/firebase/messaging";
import { webRouteState } from "@_shared/store/webRouteState";
import {
  usePostMessage,
  useMessageController,
  useActionController,
  useMessageDispatcher,
  WebView
} from "@_shared/ui/webview";

export const HomeScreen = () => {
  const webviewRef = useRef<WebView>(null);
  const setWebRoute = useSetRecoilState(webRouteState);

  const postMessage = usePostMessage({ webviewRef });
  const onMessage = useMessageController();
  const onAction = useActionController({ webviewRef });
  const handleMessage = useMessageDispatcher({ onMessage, onAction });

  useTokenCookieManager();
  usePushNotification({
    onMessage: (message) => postMessage("NEW_NOTIFICATION", message),
    onNotificationOpenedApp: (message) => postMessage("PUSH_NOTIFICATION", message)
  });

  const handleNavigationStateChange = (nav: WebViewNavigation) => {
    setWebRoute({
      url: nav.url,
      canGoBack: nav.canGoBack
    });
  };

  return (
    <WebView
      className="flex-1"
      ref={webviewRef}
      onMessage={handleMessage}
      onLoadEnd={() => SplashScreen.hide()}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};
