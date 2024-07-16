import messaging from "@react-native-firebase/messaging";
import { Platform, NativeModules, PermissionsAndroid } from "react-native";

const firebaseMessaging = messaging();

// ios 사용자에게 알림권한 요청
export const iosRequestPermission = async () => {
  try {
    const authorizationStatus = await messaging().requestPermission();
    // 알림 권한이 허용되면 authorizationStatus 값에 대한 안내는 상단에 작성되어 있습니다.
    // authorizationStatus 값이 AUTHORIZED 일 때,
    if (authorizationStatus === 1) {
      const apnsToken = await firebaseMessaging.getAPNSToken();
      // APNs 토큰이 등록되어 있지 않으면 getToken() 함수가 실패합니다.
      // FCM토큰을 가져오기 전에 APNs 토큰이 등록되어있는지 먼저 확인합니다.
      if (apnsToken) {
        const fcmToken = await firebaseMessaging.getToken();
        // 와이즈트래커 SDK가 토큰을 수집합니다.
        NativeModules.DotReactBridge.setPushToken(fcmToken);
      }
    } else {
      console.log("알림권한 비 활성화:");
    }
  } catch (error) {
    console.log("ios error::", error);
  }
};

// Android 사용자에게 알림권한 요청
export const androidRequestPermission = async () => {
  const authorizationStatus = await messaging().requestPermission();
  console.log("authorizationStatus:", authorizationStatus);
  try {
    const fcmToken = await firebaseMessaging.getToken();
    if (Platform.OS === "android") {
      console.log("get android FCM Token:", fcmToken);
      if (Platform.Version >= 33) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS
          /*
           * 알림허용이 denied 일때, 알림 허용에 대한 재안내와
           * 알림수신에 대한 요청을 다시 할 수 있는 내용 작성가능.
           * */
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log("Android 13이상 , 알림권한 허용.");
          if (fcmToken) {
            //토큰 수집
            NativeModules.DotReactBridge.setPushToken(fcmToken);
          }
        }
      }
      // API 레벨 32 이하일 때
      try {
        if (fcmToken) {
          //토큰 수집
          NativeModules.DotReactBridge.setPushToken(fcmToken);
        }
      } catch (e) {
        console.log("android token API level 32 이하 error:", e);
      }
    }
  } catch (error) {
    console.log("Android error:", error);
  }
};
