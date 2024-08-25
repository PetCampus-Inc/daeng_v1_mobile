import { useEffect, useState } from "react";
import { KeyboardAvoidingViewProps, NativeModules, Platform } from "react-native";

const { StatusBarManager } = NativeModules;

/**
 * `KeyboardAvoidingView`의 속성을 반환합니다.
 * @deprecated 사용되지 않습니다.
 * @param bottomOffset `KeyboardAvoidingView`의 하단 여백
 * @returns `KeyboardAvoidingView`의 속성
 */
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
    className: "flex-1",
    keyboardVerticalOffset: statusBarHeight,
    behavior: isIOS ? "padding" : "height"
  };

  return keyboardAvoidingProps;
};

export default useKeyboardAvoiding;
