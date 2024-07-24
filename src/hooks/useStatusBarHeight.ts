import { useEffect, useState } from "react";
import { NativeModules, Platform } from "react-native";

const { StatusBarManager } = NativeModules;

const useStatusBarHeight = () => {
  const [statusBarHeight, setStatusBarHeight] = useState(0);

  useEffect(() => {
    if (Platform.OS === "ios") {
      StatusBarManager.getHeight((statusBarFrameData: { height: React.SetStateAction<number> }) => {
        setStatusBarHeight(statusBarFrameData.height);
      });
    }
  }, []);

  return statusBarHeight;
};

export default useStatusBarHeight;
