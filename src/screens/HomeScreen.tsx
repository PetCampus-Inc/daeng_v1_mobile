import React, { useRef } from "react";
import SplashScreen from "react-native-splash-screen";
import WebView, { WebViewNavigation } from "react-native-webview";
import { useSetRecoilState } from "recoil";

import { BridgeWebView } from "@_widgets/bridge-webview";

import { useNotificationRouting } from "@_shared/hooks/use-push-notification";
import { useBackHandler } from "@_shared/hooks/useBackHandler";
import { useTokenCookieManager } from "@_shared/hooks/useTokenCookieManager";
import { webRouteState } from "@_shared/store/webRouteState";

export const HomeScreen = () => {
  const webviewRef = useRef<WebView>(null);
  const setWebRoute = useSetRecoilState(webRouteState);

  useBackHandler();
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
    <BridgeWebView
      ref={webviewRef}
      onLoadEnd={() => SplashScreen.hide()}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};
