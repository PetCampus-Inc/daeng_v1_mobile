import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RefObject } from "react";
import WebView from "react-native-webview";

import useLogin from "../auth/useLogin";
import useWebViewMessage from "../webview/useWebViewMessage";

import { RootStackParams } from "~/navigator/RootNavigator";
import { WebViewMessage } from "~/types/message.types";

interface AdminSignUpScreenLogic {
  webviewRef: RefObject<WebView>;
}

const useAdminSignUpScreenLogic = ({ webviewRef }: AdminSignUpScreenLogic) => {
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { adminLogin } = useLogin();
  const { handleMessage } = useWebViewMessage({
    webviewRef,
    onCallback: (message) => handleAdminLogin(message)
  });

  const handleAdminLogin = async ({ type, data }: WebViewMessage) => {
    if (type === "ADMIN_LOGIN") {
      await adminLogin(data);
      rootNavigation.navigate("Home");
    }
  };

  return { handleMessage };
};

export default useAdminSignUpScreenLogic;
