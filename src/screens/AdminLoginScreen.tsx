// import { useNavigation } from "@react-navigation/native";
import React, { useRef } from "react";
import { WebViewNavigation } from "react-native-webview";

import WebView, { WebViewElement } from "~/components/WebView";
// import { baseUrl } from "~/config/url";

const AdminLoginScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  // const navigation = useNavigation();
  const startPath = "/admin/login";

  const handleNavigationStateChange = (e: WebViewNavigation) => {
    // const path = e.url.replace(baseUrl, "");
    console.log(e.url);
    // if (path !== startPath) setHasNavigated(true);
    // if (hasNavigated && path === startPath && !e.canGoBack) navigation.goBack();
  };

  return (
    <WebView
      ref={webviewRef}
      path={startPath}
      onNavigationStateChange={handleNavigationStateChange}
    />
  );
};

export default AdminLoginScreen;
