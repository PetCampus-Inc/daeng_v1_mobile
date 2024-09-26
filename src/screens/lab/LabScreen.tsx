import { View } from "react-native";
import WebView from "react-native-webview";

export const LabScreen = () => {
  return (
    <View className="flex-1">
      <WebView className="flex-1" source={{ uri: "http://localhost:3000/login" }} />
    </View>
  );
};
