import { useNavigation, useNavigationState } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "@_app/navigation/RootNavigation";

type NavigateType = "push" | "replace" | "back" | "pop";

export type NavigateOptions = {
  type: NavigateType;
  path: string;
  state?: any;
};

export const useStackNavigation = () => {
  const { replace, push, pop, popToTop, canGoBack } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const currentRoute = useNavigationState((state) => state.routes[state.routes.length - 1]);

  return ({ type, path, state }: NavigateOptions) => {
    const currentScreen = currentRoute.name as keyof RootStackParamList;

    switch (type) {
      case "push":
        push("Stack", { path, state });
        break;
      case "replace":
        replace(currentScreen, { path, state });
        break;
      case "back":
        if (canGoBack()) pop();
        else throw new Error("스택이 없습니다.");
        break;
      case "pop":
        popToTop();
        break;
    }
  };
};
