import { useRef } from "react";
import { View } from "react-native";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { WebViewElement } from "~/components/WebView";
import useAdminSignUpScreenLogic from "~/hooks/service/useAdminSignScreenLogic";

const AdminSignUpScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);
  const { handleMessage } = useAdminSignUpScreenLogic();

  return (
    <View className="flex-1">
      <KeyboardAvoidingWebView
        ref={webviewRef}
        path={"/admin/signup"}
        onMessage={handleMessage}
        sharedCookiesEnabled={true}
      />
    </View>
  );
};

export default AdminSignUpScreen;
