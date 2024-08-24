import notifee from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { Platform, PermissionsAndroid } from "react-native";

const firebaseMessaging = messaging();

export const requestMessagingPermission = async () => {
  try {
    const hasPermission = await notifee.requestPermission();
    if (hasPermission) return;

    if (Platform.OS === "ios") {
      const authStatus = await firebaseMessaging.requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (!enabled) throw new Error("알림 권한이 거부되었습니다.");
    } else if (Platform.OS === "android" && Platform.Version >= 33) {
      // API 레벨 33 이상
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED)
        throw new Error("알림 권한이 거부되었습니다.");
    }
  } catch (error) {
    console.error("[Permission]", error);
  }
};
