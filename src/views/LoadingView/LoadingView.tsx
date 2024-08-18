import LottieView from "lottie-react-native";
import { View } from "react-native";
import { useRecoilValue } from "recoil";

import { loadingState } from "~/store/loading";
import { cn } from "~/utils/cn";

const LoadingView = () => {
  const isLoading = useRecoilValue(loadingState);

  return (
    <View
      className={cn(
        "absolute top-0 bottom-0 left-0 right-0 items-center justify-center bg-black/40",
        isLoading ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
    >
      <LottieView
        source={require("~/assets/lottie/loading_spinner_light.json")}
        // eslint-disable-next-line react-native/no-inline-styles
        style={{ width: 120, height: 60 }}
        autoPlay
        loop
      />
    </View>
  );
};

export default LoadingView;
