import { RefObject, useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import WebView from "react-native-webview";

// TODO: 히스토리 없을 때, 뒤로가기 두번 누르면 앱 종료 추가

/**
 * `WebView`에서 뒤로가기 버튼을 눌렀을 때의 동작을 핸들링합니다.
 * @param webviewRef `Webview` 참조
 */
const useBackHandler = (webviewRef: RefObject<WebView>) => {
  const handleBackPress = useCallback(() => {
    if (webviewRef.current) {
      webviewRef.current.goBack();
      return true;
    }
    return false;
  }, [webviewRef]);

  useEffect(() => {
    BackHandler.addEventListener("hardwareBackPress", handleBackPress);
    return () => {
      BackHandler.removeEventListener("hardwareBackPress", handleBackPress);
    };
  }, [handleBackPress]);
};

export default useBackHandler;
