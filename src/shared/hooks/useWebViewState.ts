import { RouteProp, useRoute } from "@react-navigation/native";
import { RefObject } from "react";
import WebView from "react-native-webview";

import { RootStackParamList } from "@_app/navigation/RootNavigation";

import { postMessage } from "@_shared/lib/bridge";

interface WebViewStateOptions {
  webviewRef: RefObject<WebView>;
}

/**
 * WebView에서 전달한 상태 값을 처리하는 훅
 * @param webviewRef WebView 참조
 */
export const useWebViewState = ({ webviewRef }: WebViewStateOptions) => {
  const {
    params: { state }
  } = useRoute<RouteProp<RootStackParamList, "Stack">>();

  const onLoadEnd = () => {
    // WebView 로드가 완료되면 WebView로 상태 값 전달
    if (state) {
      postMessage(webviewRef, {
        type: "WEBVIEW_STATE",
        body: state
      });
    }
  };

  return { onLoadEnd };
};
