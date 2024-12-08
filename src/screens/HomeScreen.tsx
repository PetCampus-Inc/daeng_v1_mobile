import React, { useRef } from "react";
import SplashScreen from "react-native-splash-screen";
import WebView from "react-native-webview";

import { BridgeWebView } from "@_widgets/bridge-webview";

import { useNotificationRouting } from "@_shared/hooks/use-push-notification";

export const HomeScreen = () => {
  const webviewRef = useRef<WebView>(null);

  useNotificationRouting({ webviewRef });

  return <BridgeWebView ref={webviewRef} onLoadEnd={() => SplashScreen.hide()} />;
};
