import { RefObject, useCallback, useEffect, useState } from "react";
import { BackHandler, ToastAndroid } from "react-native";
import WebView from "react-native-webview";
import { useRecoilValue } from "recoil";

import { webRouteState } from "@_shared/store/webRouteState";

const DOUBLE_PRESS_DELAY = 2000;

// TODO: onNavigationStateChange의 콜백 값이 이상해서 반응이 좋지 않음.

/**
 * `WebView`에서 뒤로가기 버튼을 눌렀을 때의 동작을 핸들링합니다.
 * @param webviewRef `Webview` 참조
 */
export const useBackHandler = (webviewRef: RefObject<WebView>) => {
  const [lastBackPressed, setLastBackPressed] = useState(0);
  const { canGoBack } = useRecoilValue(webRouteState);

  const handleBackPress = useCallback(() => {
    const now = new Date().getTime();
    const timeDiff = now - lastBackPressed;

    if (webviewRef.current && canGoBack) {
      webviewRef.current.goBack();
      return true;
    } else {
      if (timeDiff < DOUBLE_PRESS_DELAY) {
        BackHandler.exitApp();
        return true;
      }
      setLastBackPressed(now);
      ToastAndroid.show("한번 더 누르면 앱을 끌 수 있어요.", ToastAndroid.SHORT);
    }

    return true;
  }, [webviewRef, lastBackPressed, canGoBack]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [handleBackPress]);
};
