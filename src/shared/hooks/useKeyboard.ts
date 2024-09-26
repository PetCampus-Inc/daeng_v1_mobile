import { useEffect } from "react";
import { Platform } from "react-native";
import { useAnimatedKeyboard, useAnimatedReaction, useSharedValue } from "react-native-reanimated";
import { useSafeAreaFrame, useSafeAreaInsets } from "react-native-safe-area-context";

export const useKeyboard = () => {
  const keyboard = useAnimatedKeyboard();
  const { top } = useSafeAreaInsets();
  const { y } = useSafeAreaFrame();

  const safeAreaHeight = Platform.OS === "ios" ? top : y;
  const keyboardHeight = useSharedValue(0);

  useAnimatedReaction(
    () => keyboard.height.value,
    (height) => {
      if (Platform.OS === "ios") {
        keyboardHeight.value = Math.max(0, height - safeAreaHeight);
      } else {
        keyboardHeight.value = height;
      }
    },
    [keyboard.height.value, safeAreaHeight]
  );

  useEffect(() => {
    // console.log(keyboardHeight.value);
  }, [keyboardHeight.value]);
};
