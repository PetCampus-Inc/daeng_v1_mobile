import { RouteProp, useRoute } from "@react-navigation/native";
import { useRef } from "react";
import WebView from "react-native-webview";

import { RootStackParamList } from "@_app/navigation/RootNavigation";

import { BridgeWebView } from "@_widgets/bridge-webview";

import { useWebViewState } from "@_shared/hooks/useWebViewState";

export const StackScreen = () => {
  const webviewRef = useRef<WebView>(null);
  const { params } = useRoute<RouteProp<RootStackParamList, "Stack">>();

  const { onLoadEnd } = useWebViewState({ webviewRef });

  return <BridgeWebView ref={webviewRef} path={params.path} onLoadEnd={onLoadEnd} />;
};
