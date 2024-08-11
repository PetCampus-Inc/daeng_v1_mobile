import { useRef } from "react";
import { View } from "react-native";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { WebViewElement } from "~/components/WebView";
import useMessageHandler from "~/hooks/webview/useMessageHandler";
import useWebViewMessage from "~/hooks/webview/useWebViewMessage";

const AdminSignUpScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  const { messageHandler } = useMessageHandler({ webviewRef });
  const { handleMessage } = useWebViewMessage({ onSubscribe: messageHandler });

  return (
    <View className="flex-1">
      <KeyboardAvoidingWebView
        className="flex-1"
        ref={webviewRef}
        path={"/admin/signup"}
        onMessage={handleMessage}
        sharedCookiesEnabled={true}
      />
    </View>
  );
};

export default AdminSignUpScreen;
