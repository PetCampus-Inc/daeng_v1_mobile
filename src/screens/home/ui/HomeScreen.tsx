import React, { useRef } from "react";
import SplashScreen from "react-native-splash-screen";
import { WebViewNavigation } from "react-native-webview";
import { useSetRecoilState } from "recoil";

import { useTokenCookieManager } from "@_shared/hooks/auth";
import { useNotificationRouting } from "@_shared/hooks/use-push-notification";
import { webRouteState } from "@_shared/store/webRouteState";
import {
  useMessageController,
  useActionController,
  useMessageDispatcher,
  WebView
} from "@_shared/ui/webview";

export const HomeScreen = () => {
  const webviewRef = useRef<WebView>(null);
  const setWebRoute = useSetRecoilState(webRouteState);

  const onMessage = useMessageController();
  const onAction = useActionController({ webviewRef });
  const handleMessage = useMessageDispatcher({ onMessage, onAction });

  useTokenCookieManager();
  useNotificationRouting({
    onRouteChange: (route) =>
      webviewRef.current?.injectJavaScript(`window.location.href = '${route}';`)
  });

  const handleNavigationStateChange = (nav: WebViewNavigation) => {
    setWebRoute({
      url: nav.url,
      canGoBack: nav.canGoBack
    });
  };

  return (
    <>
      <WebView
        className="flex-1"
        ref={webviewRef}
        onMessage={handleMessage}
        onLoadEnd={() => SplashScreen.hide()}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </>
  );
};
