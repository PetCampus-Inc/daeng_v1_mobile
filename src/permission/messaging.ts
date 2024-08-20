import messaging from "@react-native-firebase/messaging";
import { Platform, PermissionsAndroid } from "react-native";

const firebaseMessaging = messaging();

export const requestMessagingPermission = async () => {
  try {
    if (Platform.OS === "ios") await iosRequestPermission();
    else if (Platform.OS === "android") await androidRequestPermission();
  } catch (error) {
    console.error("[Permission]", error);
  }
};

// IOS
export const iosRequestPermission = async () => {
  try {
    const authStatus = await firebaseMessaging.requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
    if (!enabled) throw new Error("알림 권한이 거부되었습니다.");
  } catch (error) {
    throw error;
  }
};

// Android
export const androidRequestPermission = async () => {
  if (Platform.OS !== "android") return;

  try {
    // API 레벨 33 이상
    if (Platform.Version >= 33) {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
      );

      if (granted !== PermissionsAndroid.RESULTS.GRANTED)
        throw new Error("알림 권한이 거부되었습니다.");
    }
  } catch (error) {
    throw error;
  }
};
