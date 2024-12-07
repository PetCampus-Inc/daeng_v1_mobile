import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "@_app/navigation/RootNavigation";

export type Path = string | 0 | -1;

export type NavigateOptions = {
  state?: any;
  replace?: boolean;
};

export const useStackNavigation = () => {
  const { replace, push, pop, popToTop, canGoBack } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (path: Path, options?: NavigateOptions) => {
    switch (path) {
      case 0:
        popToTop();
        break;
      case -1:
        if (canGoBack()) pop();
        else throw new Error("스택이 없습니다.");
        break;
      default:
        if (options?.replace) replace("WebView", { path, state: options?.state });
        else push("WebView", { path, state: options?.state });
        break;
    }
  };
};
