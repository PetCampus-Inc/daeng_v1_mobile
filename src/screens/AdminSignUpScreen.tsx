import { useRef } from "react";

import KeyboardAvoidingWebView from "~/components/KeyboardAvoidingWebView";
import { WebViewElement } from "~/components/WebView";
import useAdminSignUpScreenLogic from "~/hooks/service/useAdminSignScreenLogic";

const AdminSignUpScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);
  const { handleMessage } = useAdminSignUpScreenLogic({ webviewRef });

  return (
    <KeyboardAvoidingWebView
      ref={webviewRef}
      path={"/admin/signup"}
      onMessage={handleMessage}
      sharedCookiesEnabled={true}
    />
  );
};

export default AdminSignUpScreen;
