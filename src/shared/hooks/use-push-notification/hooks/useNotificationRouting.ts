import { RefObject, useCallback } from "react";
import WebView from "react-native-webview";

import { useStackNavigation } from "@_shared/hooks/use-stack-navigation";
import { useFirebaseCloudMessage } from "@_shared/lib/firebase/messaging";

import { NotificationData, notificationRoute, RouteConfig } from "../model/notificationRoute";

interface NotificationRoutingProps {
  webviewRef: RefObject<WebView>;
}

/**
 * FCM 푸시 알림을 처리하는 훅입니다.
 * @param webviewRef - WebView 참조
 */
export const useNotificationRouting = ({ webviewRef }: NotificationRoutingProps) => {
  const stackNavigation = useStackNavigation();

  useFirebaseCloudMessage({
    onNotificationOpenedApp: (data) => handleNotificationNavigation(data)
  });

  /**
   * 푸시 알림 데이터를 받아 라우팅 경로를 처리합니다.
   * @param jsonData - 푸시 알림 데이터
   */
  const handleNotificationNavigation = useCallback(
    (jsonData: string) => {
      const data: NotificationData = JSON.parse(jsonData);
      const { path, stack } = getNotificationRoute(data);

      if (stack) stackNavigation({ method: "webview", path });
      else webviewRef.current?.injectJavaScript(`window.location.href = '${path}';`);
    },
    [webviewRef, stackNavigation]
  );

  /**
   * 푸시 알림 데이터를 받아 라우팅 경로를 반환합니다.
   * @param data - 푸시 알림 데이터
   * @returns 라우팅 경로
   */
  const getNotificationRoute = (data: NotificationData): RouteConfig => {
    try {
      const targetRoute = notificationRoute[data.category][data.type];
      if (!targetRoute) throw new Error("대상 라우터가 없습니다.");

      if (typeof targetRoute === "function" && data.dogId) return targetRoute(data.dogId);

      return targetRoute as RouteConfig;
    } catch (_) {
      return {
        path: "/",
        stack: false
      };
    }
  };
};
