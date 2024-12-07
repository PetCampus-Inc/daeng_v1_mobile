import React, { useRef } from "react";
import SplashScreen from "react-native-splash-screen";
import WebView from "react-native-webview";

import { BridgeWebView } from "@_widgets/bridge-webview";

import { useNotificationRouting } from "@_shared/hooks/use-push-notification";
import { useBackHandler } from "@_shared/hooks/useBackHandler";
import { useTokenCookieManager } from "@_shared/hooks/useTokenCookieManager";

export const HomeScreen = () => {
  const webviewRef = useRef<WebView>(null);

  useBackHandler();
  useTokenCookieManager();
  useNotificationRouting({
    onRouteChange: (route) =>
      webviewRef.current?.injectJavaScript(`window.location.href = '${route}';`)
  });

  return <BridgeWebView ref={webviewRef} onLoadEnd={() => SplashScreen.hide()} />;
};
