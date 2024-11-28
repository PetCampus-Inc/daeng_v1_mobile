import { useCallback, useEffect, useState } from "react";
import { BackHandler, ToastAndroid } from "react-native";

const DOUBLE_PRESS_DELAY = 2000;

/** [AOS] `WebView`에서 뒤로가기 버튼을 눌렀을 때의 동작을 핸들링합니다. */
export const useBackHandler = () => {
  const [lastBackPressed, setLastBackPressed] = useState(0);

  const handleBackPress = useCallback(() => {
    const now = new Date().getTime();
    const timeDiff = now - lastBackPressed;

    if (timeDiff < DOUBLE_PRESS_DELAY) {
      BackHandler.exitApp();
      return true;
    }

    setLastBackPressed(now);
    ToastAndroid.show("한번 더 누르면 앱을 끌 수 있어요.", ToastAndroid.SHORT);
  }, [lastBackPressed]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
  }, [handleBackPress]);
};
