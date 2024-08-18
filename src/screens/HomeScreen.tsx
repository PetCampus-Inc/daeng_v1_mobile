import React, { useRef } from "react";
import { View } from "react-native";
import SplashScreen from "react-native-splash-screen";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { type WebViewElement } from "~/components/WebView";
import useWebViewMessage from "~/hooks/webview/useWebViewMessage";

const HomeScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);
  const { handleMessage } = useWebViewMessage({ webviewRef });

  return (
    <View className="flex-1">
      <KeyboardAvoidingWebView
        className="flex-1"
        ref={webviewRef}
        onMessage={handleMessage}
        sharedCookiesEnabled={true}
        onLoadEnd={() => SplashScreen.hide()}
      />
    </View>
  );
};

export default HomeScreen;
