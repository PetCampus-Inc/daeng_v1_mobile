import { RouteProp, useRoute } from "@react-navigation/native";
import { RefObject } from "react";
import WebView from "react-native-webview";

import { RootStackParamList } from "@_app/navigation/RootNavigation";

import { postMessage } from "@_shared/lib/bridge/lib/postMessage";

interface WebViewStateOptions {
  webviewRef: RefObject<WebView>;
}

export const useWebViewState = ({ webviewRef }: WebViewStateOptions) => {
  const {
    params: { state }
  } = useRoute<RouteProp<RootStackParamList, "WebView">>();

  const onLoadEnd = () => {
    if (state) {
      postMessage(webviewRef, {
        type: "WEBVIEW_STATE",
        body: state
      });
    }
  };

  return { onLoadEnd };
};
