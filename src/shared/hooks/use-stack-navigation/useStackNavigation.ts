import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "@_app/navigation/RootNavigation";

export type Path = string | 0 | -1;

export const useStackNavigation = () => {
  const { push, pop, popToTop } = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return (path: Path) => {
    if (path === 0) popToTop();
    else if (path === -1) pop();
    else push("WebView", { path });
  };
};
