import notifee from "@notifee/react-native";
import { FirebaseMessagingTypes } from "@react-native-firebase/messaging";

export const handleMessageReceived = async (message: FirebaseMessagingTypes.RemoteMessage) => {
  const channelId = await notifee.createChannel({
    id: "default",
    name: "Default Channel"
  });

  await notifee.displayNotification({
    title: message.notification!.title,
    body: message.notification!.body,
    android: {
      channelId: channelId,
      smallIcon: "ic_launcher"
    }
  });
};
