import React, { useRef } from "react";

import WebView, { WebViewElement } from "~/components/WebView";

const AdminScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  const startPath = "/admin/login";

  return <WebView ref={webviewRef} path={startPath} />;
};

export default AdminScreen;
