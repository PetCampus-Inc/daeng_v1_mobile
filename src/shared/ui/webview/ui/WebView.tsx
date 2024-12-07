import React, { forwardRef, RefObject, useRef } from "react";
import ParentWebView, { WebViewProps as ParentWebViewProps } from "react-native-webview";

import { baseUrl } from "@_shared/config/domain";

import { configureWebViewSetting } from "../config/webviewConfig";

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
        onContentProcessDidTerminate={handleContentProcessDidTerminate}
        source={{
          uri: `${baseUrl}${fullPath}`,
          headers: {
            ...headers,
            "Accept-Language": "ko"
          }
        }}
        {...configureWebViewSetting}
        {...props}
      />
    );
  }
);

export type WebView = ParentWebView;
