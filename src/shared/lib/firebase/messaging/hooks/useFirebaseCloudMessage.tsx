import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Platform } from "react-native";

import { requestMessagingPermission } from "../lib/messagingPermission";

const firebaseMessaging = messaging();

interface PushNotificationOptions {
  /** 백그라운드 또는 종료된 상태에서 푸시 알림을 클릭했을 때 호출될 함수 */
  onNotificationOpenedApp?: (data: string) => void;
}

/**
 * 푸시 알림을 처리하는 훅입니다.
 * @param onMessage 앱 실행 중에 푸시 알림을 받았을 때 호출될 함수
 * @param onNotificationOpenedApp 백그라운드 또는 종료된 상태에서 푸시 알림을 클릭했을 때 호출될 함수
 */
export const useFirebaseCloudMessage = ({
  onNotificationOpenedApp
}: PushNotificationOptions = {}) => {
  useEffect(() => {
    requestMessagingPermission();

    if (Platform.OS === "android") {
      // Android 앱 종료 상태에서 푸시 알림을 클릭해 앱을 실행했을 때
      firebaseMessaging.getInitialNotification().then((initialNotification) => {
        if (initialNotification?.data && onNotificationOpenedApp) {
          onNotificationOpenedApp(JSON.stringify(initialNotification.data));
          return;
        }
      });
    }

    // 백그라운드 상태에서 알림을 클릭해 앱을 실행했을 때
    const backgroundMessageUnsubscribe = firebaseMessaging.onNotificationOpenedApp(
      (remoteMessage) => {
        if (remoteMessage.data && onNotificationOpenedApp) {
          onNotificationOpenedApp(JSON.stringify(remoteMessage.data));
          return;
        }
      }
    );

    return () => backgroundMessageUnsubscribe();
  }, [onNotificationOpenedApp]);
};
