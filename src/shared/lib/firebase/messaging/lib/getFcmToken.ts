import messaging from "@react-native-firebase/messaging";

export const getFcmToken = async () => {
  const fcmToken = await messaging().getToken();
  if (fcmToken) return fcmToken;
  else throw new Error("FCM 토큰을 가져올 수 없습니다.");
};
