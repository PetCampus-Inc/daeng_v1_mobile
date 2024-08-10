import React, { useRef, useState } from "react";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { type WebViewElement } from "~/components/WebView";
import usePostAuthData from "~/hooks/auth/usePostAuthData";
import useMessageHandler from "~/hooks/webview/useMessageHandler";
import useWebViewMessage from "~/hooks/webview/useWebViewMessage";

const HomeScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  const [isWebViewLoaded, setIsWebViewLoaded] = useState(false);

  usePostAuthData(webviewRef, isWebViewLoaded);
  const { messageHandler } = useMessageHandler({ webviewRef });
  const { handleMessage } = useWebViewMessage({ onSubscribe: messageHandler });

  return (
    <KeyboardAvoidingWebView
      className="flex-1"
      ref={webviewRef}
      path={"/native-redirect"}
      onMessage={handleMessage}
      sharedCookiesEnabled={true}
      onLoadEnd={() => setIsWebViewLoaded(true)}
    />
  );
};

export default HomeScreen;
