import React, { forwardRef, RefObject, useRef } from "react";
import ParentWebView, { WebViewProps as ParentWebViewProps } from "react-native-webview";

import { baseUrl } from "~/config/url";
import useBackHandler from "~/hooks/webview/useBackHandler";
import useWebviewLog from "~/hooks/webview/useWebviewLog";

interface Headers {
  [key: string]: string;
}

export interface WebViewProps extends ParentWebViewProps {
  path?: string;
  headers?: Headers;
}

const WebView = forwardRef<ParentWebView, WebViewProps>(
  ({ path = "", headers, onMessage, ...props }, ref) => {
    const localRef = useRef<ParentWebView>(null);
    const webviewRef = (ref as RefObject<ParentWebView>) || localRef;
    const fullPath = path.startsWith("/") ? path : `/${path}`;

    useBackHandler(webviewRef);
    const { debuggingScript, handleMessageInterceptor } = useWebviewLog(onMessage);

    /** 백그라운드 환경에서 웹뷰 강제 종료 현상 방지 (IOS) */
    const handleContentProcessDidTerminate = () => webviewRef.current?.reload();

    return (
      <ParentWebView
        ref={webviewRef}
        bounces={false}
        onMessage={handleMessageInterceptor}
        onContentProcessDidTerminate={handleContentProcessDidTerminate}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        automaticallyAdjustContentInsets={false}
        injectedJavaScript={debuggingScript}
        webviewDebuggingEnabled={__DEV__}
        /** 키보드 액세서리 뷰 숨기기 */
        hideKeyboardAccessoryView={true}
        /** 쿠키 공유 활성화 */
        sharedCookiesEnabled={true}
        /** IOS 뒤로가기 제스처 활성화 */
        allowsBackForwardNavigationGestures={true}
        source={{
          uri: `${baseUrl}${fullPath}`,
          headers: {
            ...headers,
            "Accept-Language": "ko"
          }
        }}
        {...props}
      />
    );
  }
);

export default WebView;
export type WebViewElement = ParentWebView;
