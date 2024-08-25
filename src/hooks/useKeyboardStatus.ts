import { useState, useEffect } from "react";
import { Keyboard, KeyboardEvent, Platform } from "react-native";

/**
 * 키보드의 상태를 반환합니다.
 * @return `isKeyboardVisible` 키보드 활성화 여부
 * @return `keyboardHeight` 키보드의 높이
 */
const useKeyboardStatus = () => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const showListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      (e: KeyboardEvent) => {
        setKeyboardVisible(true);
        setKeyboardHeight(e.endCoordinates.height);
      }
    );
    const hideListener = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        setKeyboardHeight(0);
      }
    );

    return () => {
      showListener.remove();
      hideListener.remove();
    };
  }, []);

  return { isKeyboardVisible, keyboardHeight };
};

export default useKeyboardStatus;
