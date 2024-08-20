import messaging from "@react-native-firebase/messaging";
import { useCallback, useEffect } from "react";
import { useSetRecoilState } from "recoil";

import { requestMessagingPermission } from "~/permission/messaging";
import { fcmTokenState } from "~/store/fcmToken";
import { handleMessageReceived } from "~/utils/messageHandler";

const firebaseMessaging = messaging();

const useFCM = () => {
  const setFcmToken = useSetRecoilState(fcmTokenState);

  /**
   * Firebase Cloud Messaging 토큰을 가져옵니다.
   * @returns FCM 토큰
   */
  const getFcmToken = useCallback(async (): Promise<string | null> => {
    try {
      const token = await firebaseMessaging.getToken();
      if (!token) throw new Error("FCM 토큰을 가져오는 데 실패했습니다.");
      return token;
    } catch (error) {
      console.error(error);
      return null;
    }
  }, []);

  useEffect(() => {
    const setupMessaging = async () => {
      try {
        await requestMessagingPermission();

        const fcmToken = await getFcmToken();
        setFcmToken(fcmToken);
      } catch (error) {
        console.error("Error setting up messaging:", error);
      }
    };

    setupMessaging();

    const foregroundMessage = firebaseMessaging.onMessage((remoteMessage) => {
      console.log("앱이 실행 중일 때 알림을 수신했습니다.");
      handleMessageReceived(remoteMessage);
    });

    const backgroundMessage = firebaseMessaging.onNotificationOpenedApp((remoteMessage) => {
      console.log("앱이 백그라운드에서 실행 중일 때 알림을 클릭하여 앱을 실행했습니다.");
      handleMessageReceived(remoteMessage);
    });

    firebaseMessaging.getInitialNotification().then((remoteMessage) => {
      if (remoteMessage) {
        console.log("앱이 종료된 상태에서 알림을 클릭하여 앱을 실행했습니다.");
        handleMessageReceived(remoteMessage);
      }
    });

    return () => {
      foregroundMessage();
      backgroundMessage();
    };
  }, [getFcmToken, setFcmToken]);

  return { getFcmToken };
};

export default useFCM;
