import { Text, View } from "react-native";
import { ToastProps } from "react-native-toast-notifications/lib/typescript/toast";

export function Toast({ message, data }: ToastProps) {
  const bottom = data?.bottom ?? 24;

  return (
    <View
      className="absolute left-4 right-4 z-10 px-4 py-3 rounded-xl bg-black/80"
      style={{ bottom }}
    >
      <Text className="text-white text-center typo-label-14">{message}</Text>
    </View>
  );
}
