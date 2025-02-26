import { useNavigation, useRoute } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { RootStackParamList } from "@_app/navigation/RootNavigation";

type NavigateMethod = "webview" | "push" | "replace" | "back" | "pop";

export type NavigateOptions = {
  method: NavigateMethod;
  path: string;
  state?: any;
};

export const useStackNavigation = () => {
  const { name } = useRoute();
  const { push, pop, popToTop, canGoBack, replace } =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  return ({ method, path, state }: NavigateOptions) => {
    switch (method) {
      case "push":
        if (isStackScreen(path)) push(path);
        else throw new Error("존재하지 않는 경로입니다.");
        break;
      case "webview":
        push("Stack", { path, state });
        break;
      case "replace":
        replace(name as keyof RootStackParamList, { path, state });
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

/** 이동 가능한 네이티브 스크린 리스트 */
const NATIVE_SCREENS: (keyof RootStackParamList)[] = [];

function isStackScreen(path: string): path is keyof RootStackParamList {
  return NATIVE_SCREENS.includes(path as keyof RootStackParamList);
}
