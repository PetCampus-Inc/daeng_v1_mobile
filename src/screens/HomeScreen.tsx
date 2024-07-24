import React, { useRef } from "react";
import { Platform, KeyboardAvoidingView } from "react-native";
import SplashScreen from "react-native-splash-screen";

import WebView, { type WebViewElement } from "~/components/WebView";
import useKeyboardStatus from "~/hooks/useKeyboardStatus";
import useMessageHandler from "~/hooks/useMessageHandler";
import useStatusBarHeight from "~/hooks/useStatusBarHeight";
import { useWebViewMessage } from "~/hooks/useWebViewMessage";

interface HomeScreenProps {
  token: string;
}

const HomeScreen = ({ token }: HomeScreenProps) => {
  const webviewRef = useRef<WebViewElement>(null);

  const { handler } = useMessageHandler({ webviewRef, token });
  const { handleMessage } = useWebViewMessage({ onSubscribe: handler });

  const statusBarHeight = useStatusBarHeight();
  const isActiveKeyboard = useKeyboardStatus();

  if (!token) return null;
  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      keyboardVerticalOffset={statusBarHeight}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <WebView
        ref={webviewRef}
        scalesPageToFit={false}
        startInLoadingState
        scrollEnabled={!isActiveKeyboard}
        onLoadEnd={() => SplashScreen.hide()}
        onMessage={handleMessage}
        path="/login/oauth2/native-redirect"
        automaticallyAdjustContentInsets={false}
      />
    </KeyboardAvoidingView>
  );
};

export default HomeScreen;
