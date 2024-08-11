import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import useLogin from "../auth/useLogin";
import useWebViewMessage from "../webview/useWebViewMessage";

import { RootStackParams } from "~/navigator/RootNavigator";
import { WebViewMessage } from "~/types/message.types";

const useAdminSignUpScreenLogic = () => {
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const { adminLogin } = useLogin();
  const { handleMessage } = useWebViewMessage({
    onSubscribe: (data) => handleAdminLogin(data)
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
