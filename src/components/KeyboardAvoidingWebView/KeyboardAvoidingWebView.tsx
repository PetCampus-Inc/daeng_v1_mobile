import React, { forwardRef } from "react";
import { Dimensions, Platform } from "react-native";
import Animated, { useAnimatedKeyboard, useAnimatedStyle } from "react-native-reanimated";
import { useSafeAreaFrame } from "react-native-safe-area-context";

import WebView, { WebViewElement, WebViewProps } from "~/components/WebView";

const height = Dimensions.get("window").height;

const KeyboardAvoidingWebView = forwardRef<WebViewElement, WebViewProps>((webviewProps, ref) => {
  const keyboard = useAnimatedKeyboard();
  const { y } = useSafeAreaFrame();
  const bottomSafeAreaHeight = Platform.OS === "ios" ? y : 0;

  const animatedStyles = useAnimatedStyle(() => ({
    maxHeight: height - keyboard.height.value - bottomSafeAreaHeight
  }));

  console.log(keyboard.height.value);

  return (
    <Animated.View className="flex-1" style={animatedStyles}>
      <WebView ref={ref} {...webviewProps} />
    </Animated.View>
  );
});

export default KeyboardAvoidingWebView;
