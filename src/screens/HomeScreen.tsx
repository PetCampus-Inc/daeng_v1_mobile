import React, { useCallback, useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { type WebViewElement } from "~/components/WebView";
import useMessageHandler from "~/hooks/webview/useMessageHandler";
import usePostMessage from "~/hooks/webview/usePostMessage";
import useWebViewMessage from "~/hooks/webview/useWebViewMessage";
import { loginState, userState } from "~/store/user";

const HomeScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);
  const user = useRecoilValue(userState);
  const isLogin = useRecoilValue(loginState);
  const [isLoaded, setIsLoaded] = useState(false);

  const { postMessage } = usePostMessage({ webviewRef });
  const { messageHandler } = useMessageHandler({ webviewRef });
  const { handleMessage } = useWebViewMessage({ onSubscribe: messageHandler });

  const handleAuthenticated = useCallback(() => {
    if (!user) return;
    postMessage("FIREBASE_AUTH", { idToken: user.accessToken, deviceId: user.role });
  }, [postMessage, user]);

  useEffect(() => {
    if (isLoaded && user && isLogin) handleAuthenticated();
  }, [isLoaded, isLogin, user, handleAuthenticated]);

  return (
    <KeyboardAvoidingWebView
      className="flex-1"
      ref={webviewRef}
      path={"/native-redirect"}
      onMessage={handleMessage}
      sharedCookiesEnabled={true}
      onLoadEnd={() => setIsLoaded(true)}
    />
  );
};
{
  /* 
      <TouchableOpacity
        className="absolute flex top-16 right-4 px-2 py-1 bg-primary-3 rounded-md"
        onPress={signOutFirebase}
      >
        <Text className="text-white">IDToken clear</Text>
      </TouchableOpacity> */
}
export default HomeScreen;
