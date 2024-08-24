import React, { useRef } from "react";
import { Alert, Clipboard, Text, TextInput, TouchableHighlight, View } from "react-native";
import SplashScreen from "react-native-splash-screen";
import { useRecoilValue } from "recoil";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { type WebViewElement } from "~/components/WebView";
import usePushNotification from "~/hooks/usePushNotification";
import useAction from "~/hooks/webview/useAction";
import usePostMessage from "~/hooks/webview/usePostMessage";
import useWebViewMessageHandler from "~/hooks/webview/useWebViewMessageHandler";
import { fcmTokenState } from "~/store/fcmToken";

const HomeScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  const fcmToken = useRecoilValue(fcmTokenState);
  const postMessage = usePostMessage({ webviewRef });
  const onAction = useAction({ webviewRef });
  const handleMessage = useWebViewMessageHandler({ onAction });

  usePushNotification({
    onMessage: (message) => postMessage("NEW_NOTIFICATION", message),
    onNotificationOpenedApp: (message) => postMessage("PUSH_NOTIFICATION", message)
  });

  const handlePress = () => {
    try {
      Clipboard.setString(fcmToken ?? "");
      Alert.alert("복사 됐어요!");
    } catch (error) {
      Alert.alert("복사에 실패했어요!");
    }
  };

  return (
    <View className="flex-1">
      <KeyboardAvoidingWebView
        className="flex-1"
        ref={webviewRef}
        onMessage={handleMessage}
        sharedCookiesEnabled={true}
        onLoadEnd={() => SplashScreen.hide()}
      />
      <View className="absolute top-18 right-2 items-center">
        <TouchableHighlight
          className="px-2 py-1 rounded-md bg-primary-2 self-center"
          onPress={handlePress}
        >
          <Text className="text-white">CopyFcmToken</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default HomeScreen;
