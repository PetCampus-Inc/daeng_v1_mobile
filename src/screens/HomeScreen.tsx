import React, { useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { type WebViewElement } from "~/components/WebView";
import useLogout from "~/hooks/auth/useLogout";
import usePostAuthData from "~/hooks/auth/usePostAuthData";
import useMessageHandler from "~/hooks/webview/useMessageHandler";
import useWebViewMessage from "~/hooks/webview/useWebViewMessage";

const HomeScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);

  usePostAuthData(webviewRef, isWebViewLoaded);
  const { messageHandler } = useMessageHandler({ webviewRef });
  const { handleMessage } = useWebViewMessage({ onSubscribe: messageHandler });
  const logout = useLogout();

  return (
    <View className="flex-1">
      <KeyboardAvoidingWebView
        className="flex-1"
        ref={webviewRef}
        path={"/native-redirect"}
        onMessage={handleMessage}
        sharedCookiesEnabled={true}
        onLoadEnd={() => setIsWebViewLoaded(true)}
      />
      <TouchableOpacity
        className="flex bg-primary-3 px-2 py-1 rounded-md absolute bottom-28 right-5"
        onPress={logout}
      >
        <Text className="text-white">로그아웃</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
