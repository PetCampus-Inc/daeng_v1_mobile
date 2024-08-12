import LottieView from "lottie-react-native";
import { View } from "react-native";

const LoadingView = () => {
  return (
    <View className="absolute top-0 bottom-0 left-0 right-0 justify-center bg-black/40">
      <LottieView
        source={require("~/assets/lottie/loading_spinner_light.json")}
        autoPlay
        loop
        style={{ width: 120, height: 60 }}
      />
    </View>
  );
};

export default LoadingView;
