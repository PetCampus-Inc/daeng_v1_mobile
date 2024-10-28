import { useFirebaseCloudMessage } from "@_shared/lib/firebase/messaging";

import { NotificationData, notificationRoute } from "../model/notificationRoute";

interface NotificationRoutingProps {
  onRouteChange?: (route: string) => void;
}

export const useNotificationRouting = ({ onRouteChange }: NotificationRoutingProps) => {
  useFirebaseCloudMessage({
    onNotificationOpenedApp: (data) => handleNotificationNavigation(data)
  });

  const handleNotificationNavigation = (jsonData: string) => {
    const data: NotificationData = JSON.parse(jsonData);
    console.log("🚀 ~ handleNotificationNavigation ~ data:", data);
    const route = resolveNotificationRoute(data);

    onRouteChange?.(route);
  };

  const resolveNotificationRoute = (data: NotificationData): string => {
    try {
      const targetRoute = notificationRoute[data.category][data.type];

      if (!targetRoute) throw new Error("대상 라우터가 없습니다.");

      if (typeof targetRoute === "function" && data.dogId) {
        return targetRoute(data.dogId);
      }

      return targetRoute as string;
    } catch (error) {
      return "/";
    }
  };
};
