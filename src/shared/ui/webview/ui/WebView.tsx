import React, { forwardRef, RefObject, useRef } from "react";
import ParentWebView, { WebViewProps as ParentWebViewProps } from "react-native-webview";

import { baseUrl } from "@_shared/config/domain";

interface Headers {
  [key: string]: string;
}

export interface WebViewProps extends ParentWebViewProps {
  path?: string;
  headers?: Headers;
}

export const WebView = forwardRef<ParentWebView, WebViewProps>(
  ({ path = "", headers, ...props }, ref) => {
    const localRef = useRef<ParentWebView>(null);
    const webviewRef = (ref as RefObject<ParentWebView>) || localRef;
    const fullPath = path.startsWith("/") ? path : `/${path}`;

    /** 백그라운드 환경에서 웹뷰 강제 종료 현상 방지 (IOS) */
    const handleContentProcessDidTerminate = () => webviewRef.current?.reload();

    return (
      <ParentWebView
        className="flex-1"
        ref={webviewRef}
        bounces={false}
        onContentProcessDidTerminate={handleContentProcessDidTerminate}
        originWhitelist={["*"]}
        scalesPageToFit={false}
        automaticallyAdjustContentInsets={false}
        allowsInlineMediaPlayback
        webviewDebuggingEnabled={__DEV__}
        /** 키보드 액세서리 뷰 숨기기 */
        hideKeyboardAccessoryView
        /** 쿠키 공유 활성화 */
        sharedCookiesEnabled
        /** IOS 뒤로가기 제스처 활성화 */
        // allowsBackForwardNavigationGestures
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

export type WebView = ParentWebView;
