import React, { useRef } from "react";
import { View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { WebViewNavigation } from "react-native-webview";
import { useSetRecoilState } from "recoil";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { type WebViewElement } from "~/components/WebView";
import useTokenCookieManager from "~/hooks/auth/useTokenCookieManager";
import usePushNotification from "~/hooks/usePushNotification";
import useValueTest from "~/hooks/useValueTest";
import useActionController from "~/hooks/webview/useActionController";
import useMessageController from "~/hooks/webview/useMessageController";
import useMessageDispatcher from "~/hooks/webview/useMessageDispatcher";
import usePostMessage from "~/hooks/webview/usePostMessage";
import { webNavigationState } from "~/store/webNavigationState";

const HomeScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);
  const setWebNavigationState = useSetRecoilState(webNavigationState);

  const { renderButtons } = useValueTest();

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
    setWebNavigationState({
      url: nav.url,
      canGoBack: nav.canGoBack
    });
  };

  return (
    <View className="flex-1">
      <KeyboardAvoidingWebView
        className="flex-1"
        ref={webviewRef}
        onMessage={handleMessage}
        onLoadEnd={() => SplashScreen.hide()}
        onNavigationStateChange={handleNavigationStateChange}
      />
      {renderButtons}
    </View>
  );
};

export default HomeScreen;
