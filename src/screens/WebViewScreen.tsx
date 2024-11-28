import { RouteProp, useRoute } from "@react-navigation/native";

import { RootStackParamList } from "@_app/navigation/RootNavigation";

import { BridgeWebView } from "@_widgets/bridge-webview";

export const WebViewScreen = () => {
  const {
    params: { path }
  } = useRoute<RouteProp<RootStackParamList, "WebView">>();

  return <BridgeWebView path={path} />;
};
