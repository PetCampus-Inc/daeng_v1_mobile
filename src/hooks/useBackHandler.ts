import { RefObject, useCallback, useEffect } from "react";
import { BackHandler } from "react-native";
import WebView from "react-native-webview";

/**
 * WebView에서 뒤로가기 버튼을 눌렀을 때의 동작을 핸들링
 * @param webviewRef Webview 참조
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
