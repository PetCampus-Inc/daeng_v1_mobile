import React, { useEffect, useRef, useState } from "react";
import { getUniqueId } from "react-native-device-info";
import SplashScreen from "react-native-splash-screen";
import { useRecoilValue } from "recoil";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { type WebViewElement } from "~/components/WebView";
import useMessageHandler from "~/hooks/webview/useMessageHandler";
import usePostMessage from "~/hooks/webview/usePostMessage";
import useWebViewMessage from "~/hooks/webview/useWebViewMessage";
import { idTokenState } from "~/store/idTokenStore";

const MemberScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const { postMessage } = usePostMessage({ webviewRef });
  const { messageHandler } = useMessageHandler({ webviewRef });
  const { handleMessage } = useWebViewMessage({ onSubscribe: messageHandler });

  const idToken = useRecoilValue(idTokenState);

  useEffect(() => {
    const postAuthData = async () => {
      try {
        if (!idToken) throw new Error("Firebase 인증 토큰이 존재하지 않습니다.");
        const deviceId = await getUniqueId();

        postMessage("FIREBASE_AUTH", { idToken, deviceId });

        SplashScreen.hide();
      } catch (error) {
        console.error(error);
      }
    };

    if (idToken && isLoaded) postAuthData();
  }, [idToken, isLoaded, postMessage]);

  return (
    <KeyboardAvoidingWebView
      ref={webviewRef}
      path={"/native-redirect"}
      onMessage={handleMessage}
      sharedCookiesEnabled={true}
      onLoadEnd={() => setIsLoaded(true)}
    />
  );
};

export default MemberScreen;
