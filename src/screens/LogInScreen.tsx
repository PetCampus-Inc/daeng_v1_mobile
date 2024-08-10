import { GOOGLE_WEB_CLIENT_ID, GOOGLE_WEB_CLIENT_ID_IOS } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { Platform, Text, TouchableOpacity, View } from "react-native";
import { getUniqueId } from "react-native-device-info";

import SocialButton from "~/components/SocialButton";
import useFirebaseAuth from "~/hooks/auth/useFirebaseAuth";
import useFirebaseProvider from "~/hooks/auth/useFirebaseProvider";
import useLogin from "~/hooks/auth/useLogin";
import { LoginStackParams } from "~/navigator/LogInNavigator";
import { FirebaseProvider } from "~/types/auth.types";

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_WEB_CLIENT_ID_IOS,
    offlineAccess: true
  });
};

const LogInScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<LoginStackParams>>();
  const lastLoginProvider = useFirebaseProvider();

  const { memberLogin } = useLogin();
  const { kakaoLogin, googleLogin, appleLogin } = useFirebaseAuth({
    onSuccess: (idToken) => handleSuccessAuth(idToken)
  });

  const handleAdminLogin = () => navigation.navigate("AdminLogin");
  const handleSuccessAuth = async (idToken: string) => {
    try {
      const deviceId = await getUniqueId();
      await memberLogin({ idToken, deviceId });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    googleSigninConfigure();
  }, []);

  const socialButtons = [
    { social: "KAKAO" as FirebaseProvider, onPress: kakaoLogin },
    { social: "GOOGLE" as FirebaseProvider, onPress: googleLogin },
    ...(Platform.OS === "ios" ? [{ social: "APPLE" as FirebaseProvider, onPress: appleLogin }] : [])
  ];

  return (
    <View className="px-4 bg-white h-full">
      {/* 타이틀 */}
      <View className="mt-[108]">
        <Text className="text-title-24-b text-foreground font-bold">
          <Text className="text-primary">우리 강아지</Text>의 유치원
        </Text>
        <Text className="text-title-24-b text-foreground font-bold">생활을 보러 갈까요?</Text>
      </View>

      {/* 소셜 로그인 버튼 */}
      <View className="gap-y-3 mt-[214]">
        {socialButtons.map((option) => {
          const isLast = lastLoginProvider === option.social;
          return <SocialButton key={option.social} isLastLogin={isLast} {...option} />;
        })}
      </View>

      {/* 서비스 체험하기 버튼 */}
      <TouchableOpacity className="self-center mt-6 px-4 py-3">
        <Text className="text-label-14-b text-gray-1 font-bold">서비스 체험하기</Text>
      </TouchableOpacity>

      <View className="absolute bottom-6 left-4 right-4 gap-y-1">
        {/* 이용 약관 | 개인정보 처리 방침 */}
        <View className="flex-row justify-center items-center">
          <TouchableOpacity className="py-1 px-2">
            <Text className="text-label-14-m text-gray-2">이용약관</Text>
          </TouchableOpacity>
          <Text className="text-label-14-m text-gray-2">|</Text>
          <TouchableOpacity className="py-1 px-2">
            <Text className="text-label-14-m text-gray-2">개인정보 처리 방침</Text>
          </TouchableOpacity>
        </View>

        {/* 관리자 로그인 버튼 */}
        <SocialButton social="ADMIN" onPress={handleAdminLogin} />
      </View>
    </View>
  );
};

export default LogInScreen;
