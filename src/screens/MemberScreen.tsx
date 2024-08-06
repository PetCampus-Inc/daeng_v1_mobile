import React, { useRef } from "react";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { type WebViewElement } from "~/components/WebView";
import useMessageHandler from "~/hooks/webview/useMessageHandler";
import useWebViewMessage from "~/hooks/webview/useWebViewMessage";

const MemberScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  const { messageHandler } = useMessageHandler({ webviewRef });
  const { handleMessage } = useWebViewMessage({ onSubscribe: messageHandler });

  return (
    <KeyboardAvoidingWebView
      ref={webviewRef}
      path={"/"}
      onMessage={handleMessage}
      sharedCookiesEnabled={true}
    />
  );
};

export default MemberScreen;
