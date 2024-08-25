import notifee from "@notifee/react-native";
import messaging from "@react-native-firebase/messaging";
import { useEffect } from "react";
import { Platform } from "react-native";

import { requestMessagingPermission } from "~/permission/messaging";

const firebaseMessaging = messaging();

interface PushNotificationOptions {
  /** 앱 실행 중에 푸시 알림을 받았을 때 호출될 함수 */
  onMessage?: (data: string) => void;
  /** 백그라운드 또는 종료된 상태에서 푸시 알림을 클릭했을 때 호출될 함수 */
  onNotificationOpenedApp?: (data: string) => void;
}

/**
 * 푸시 알림을 처리하는 훅입니다.
 * @param onMessage 앱 실행 중에 푸시 알림을 받았을 때 호출될 함수
 * @param onNotificationOpenedApp 백그라운드 또는 종료된 상태에서 푸시 알림을 클릭했을 때 호출될 함수
 */
const usePushNotification = ({
  onMessage,
  onNotificationOpenedApp
}: PushNotificationOptions = {}) => {
  useEffect(() => {
    requestMessagingPermission();

    const cleanupFunctions: (() => void)[] = [];
    // 앱 실행 중 알림을 받았을 때 (iOS, Android 공통)
    const foregroundMessageUnsubscribe = firebaseMessaging.onMessage((remoteMessage) => {
      if (remoteMessage.data && onMessage) onMessage(JSON.stringify(remoteMessage.data));
    });
    cleanupFunctions.push(foregroundMessageUnsubscribe);

    if (Platform.OS === "android") {
      // Android: 백그라운드 상태에서 알림을 클릭해 앱을 실행했을 때
      const backgroundMessageUnsubscribe = firebaseMessaging.onNotificationOpenedApp(
        (remoteMessage) => {
          console.log("NotificationOpenedApp (Android)");
          if (remoteMessage.data && onNotificationOpenedApp) {
            onNotificationOpenedApp(JSON.stringify(remoteMessage.data));
          }
        }
      );
      cleanupFunctions.push(backgroundMessageUnsubscribe);

      // Android: 종료된 상태에서 알림을 클릭해 앱을 실행했을 때
      firebaseMessaging.getInitialNotification().then((remoteMessage) => {
        if (remoteMessage) {
          if (remoteMessage.data && onNotificationOpenedApp) {
            onNotificationOpenedApp(JSON.stringify(remoteMessage.data));
          }
        }
      });
    } else if (Platform.OS === "ios") {
      // iOS: 종료 또는 백그라운드 상태에서 알림을 클릭해 앱을 실행했을 때
      const iosForegroundEventUnsubscribe = notifee.onForegroundEvent(async ({ detail }) => {
        if (detail.notification && onNotificationOpenedApp) {
          onNotificationOpenedApp(JSON.stringify(detail.notification.data));
        }
      });
      cleanupFunctions.push(iosForegroundEventUnsubscribe);
    }

    return () => {
      cleanupFunctions.forEach((cleanup) => cleanup());
    };
  }, [onMessage, onNotificationOpenedApp]);
};

export default usePushNotification;
