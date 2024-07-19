import React, { useRef } from "react";
import SplashScreen from "react-native-splash-screen";

import WebView, { type WebViewElement } from "~/components/WebView";
import useMessageHandler from "~/hooks/useMessageHandler";
import { useWebViewMessage } from "~/hooks/useWebViewMessage";

interface HomeScreenProps {
  token: string;
}

const HomeScreen = ({ token }: HomeScreenProps) => {
  const webviewRef = useRef<WebViewElement>(null);
  const { handler } = useMessageHandler({ webviewRef, token });
  const { handleMessage } = useWebViewMessage({ onSubscribe: handler });

  if (!token) return null;
  return (
    <WebView
      ref={webviewRef}
      onLoadEnd={() => SplashScreen.hide()}
      onMessage={handleMessage}
      path="/login/oauth2/native-redirect"
    />
  );
};

export default HomeScreen;
