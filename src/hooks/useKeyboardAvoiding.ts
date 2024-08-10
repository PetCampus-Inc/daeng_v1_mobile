import { useEffect, useState } from "react";
import { KeyboardAvoidingViewProps, NativeModules, Platform } from "react-native";

const { StatusBarManager } = NativeModules;

const useKeyboardAvoiding = (bottomOffset: number = 0) => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);
  const isIOS = Platform.OS === "ios";

  useEffect(() => {
    if (isIOS) {
      StatusBarManager.getHeight((statusBarFrameData: { height: number }) => {
        setStatusBarHeight(statusBarFrameData.height + bottomOffset);
      });
    }
  }, [isIOS, bottomOffset]);

  const keyboardAvoidingProps: KeyboardAvoidingViewProps = {
    keyboardVerticalOffset: statusBarHeight,
    behavior: isIOS ? "padding" : "height"
  };

  return keyboardAvoidingProps;
};

export default useKeyboardAvoiding;
