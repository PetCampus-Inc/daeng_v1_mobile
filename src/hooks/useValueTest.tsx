import { useState } from "react";
import { Alert, Clipboard, Text, TouchableOpacity, View } from "react-native";
import { getUniqueId } from "react-native-device-info";

import useFirebaseAuth from "~/hooks/auth/useFirebaseAuth";
import getFcmToken from "~/utils/getFcmToken";

export default function useValueTest() {
  const [isVisible, setIsVisible] = useState(false);
  const { getFirebaseToken } = useFirebaseAuth();

  const handleGetIdToken = async () => {
    try {
      const idToken = await getFirebaseToken();
      if (!idToken) throw new Error("ID Token이 없어요! 소셜 로그인 후 테스트해 주세요!");
      Clipboard.setString(idToken);
      Alert.alert("ID Token 클립보드에 복사 완료!");
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "알 수 없는 오류 발생!";
      Alert.alert(errMsg);
    }
  };

  const handleGetFcmToken = async () => {
    try {
      const fcmToken = await getFcmToken();
      if (!fcmToken) throw new Error("FCM Token을 가져올 수 없습니다!");
      Clipboard.setString(fcmToken);
      Alert.alert("FCM Token 클립보드에 복사 완료!");
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "알 수 없는 오류 발생!";
      Alert.alert(errMsg);
    }
  };

  const handleGetDeviceId = async () => {
    try {
      const deviceId = await getUniqueId();
      if (!deviceId) throw new Error("Device ID를 가져올 수 없습니다!");
      Clipboard.setString(deviceId);
      Alert.alert("Device ID 클립보드에 복사 완료!");
    } catch (error) {
      const errMsg = error instanceof Error ? error.message : "알 수 없는 오류 발생!";
      Alert.alert(errMsg);
    }
  };

  const renderButtons = (
    <View className="absolute right-2 top-4">
      <TouchableOpacity
        className="py-1 rounded-md mb-2 w-24"
        onPress={() => setIsVisible((prev) => !prev)}
      >
        <Text className="text-primary text-center">{isVisible ? "접기" : "펼치기"}</Text>
      </TouchableOpacity>
      {isVisible && (
        <View className="flex flex-col gap-1">
          <TouchableOpacity className="bg-primary-2 py-1 rounded-md" onPress={handleGetIdToken}>
            <Text className="text-white text-center">IDToken</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-primary-2 py-1 rounded-md" onPress={handleGetFcmToken}>
            <Text className="text-white text-center">FCM</Text>
          </TouchableOpacity>
          <TouchableOpacity className="bg-primary-2 py-1 rounded-md" onPress={handleGetDeviceId}>
            <Text className="text-white text-center">Device ID</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  return { renderButtons };
}
