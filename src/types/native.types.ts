import { RefObject } from "react";
import WebView from "react-native-webview";

export interface BaseNativeHookOptions<T = any> {
  webviewRef: RefObject<WebView>;
  onComplete?: (data?: T) => void;
  onError?: (error: Error) => void;
}
