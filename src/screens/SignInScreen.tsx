import { GOOGLE_WEB_CLIENT_ID, GOOGLE_WEB_CLIENT_ID_IOS } from "@env";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import { Platform, TouchableOpacity } from "react-native";
import { getUniqueId } from "react-native-device-info";
import SplashScreen from "react-native-splash-screen";
import styled from "styled-components/native";

import { getFirebaseProvider } from "~/apis/auth";
import { RootStackParams } from "~/components/AppRouter/AppRouter";
import Flex from "~/components/Flex";
import SocialButton from "~/components/SocialButton/SocialButton";
import Text from "~/components/Text/Text";
import useAuthStateChange from "~/hooks/useAuthStateChange";
import useFirebaseAuth from "~/hooks/useFirebaseAuth";
import { FirebaseProvider } from "~/types/auth.types";

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID,
    iosClientId: GOOGLE_WEB_CLIENT_ID_IOS,
    offlineAccess: true
  });
};

const SignInScreen = () => {
  const [lastLoginProvider, setLastLoginProvider] = useState<FirebaseProvider | null>(null);
  useAuthStateChange();

  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const { kakaoLogin, googleLogin, appleLogin } = useFirebaseAuth();

  const handleAdminLogin = () => navigation.navigate("AdminScreen");

  useEffect(() => {
    const fetchLastLogin = async () => {
      try {
        const deviceId = await getUniqueId();

        // 마지막 로그인 조회 API 호출
        const provider = await getFirebaseProvider(deviceId);

        if (provider) setLastLoginProvider(provider);
        else setLastLoginProvider(null);
      } catch (error) {
        console.error(error);
      }
    };

    googleSigninConfigure();
    fetchLastLogin();

    SplashScreen.hide();
  }, []);

  const socialButtons = [
    { social: "KAKAO" as FirebaseProvider, onPress: kakaoLogin },
    { social: "GOOGLE" as FirebaseProvider, onPress: googleLogin }
  ];

  if (Platform.OS === "ios")
    socialButtons.push({ social: "APPLE" as FirebaseProvider, onPress: appleLogin });

  return (
    <StyledSignInScreen>
      <Flex>
        <Text typo="title1_24_B" color="darkBlack">
          <Text color="primaryColor">우리 강아지</Text>의 유치원
        </Text>
        <Text typo="title1_24_B" color="darkBlack">
          생활을 보러 갈까요?
        </Text>
      </Flex>

      <Flex gap={36} justifyContent="center">
        <Flex gap={12} style={{ marginTop: 214 }}>
          {socialButtons.map((props) => {
            const isLast = lastLoginProvider === props.social;
            return <SocialButton key={props.social} lastLogin={isLast} {...props} />;
          })}
        </Flex>

        <TouchableOpacity style={{ alignSelf: "center" }}>
          <Text typo="label2_14_B" color="darkBlack">
            서비스 체험하기
          </Text>
        </TouchableOpacity>
      </Flex>

      <Footer>
        <Flex flexDirection="row" justifyContent="center" gap={6}>
          <TouchableOpacity>
            <Text typo="label2_14_M" color="gray_2">
              이용약관
            </Text>
          </TouchableOpacity>
          <Text typo="label2_14_M" color="gray_2">
            |
          </Text>
          <TouchableOpacity>
            <Text typo="label2_14_M" color="gray_2">
              개인정보 처리 방침
            </Text>
          </TouchableOpacity>
        </Flex>
        <SocialButton social="ADMIN" onPress={handleAdminLogin} />
      </Footer>
    </StyledSignInScreen>
  );
};

const StyledSignInScreen = styled.View`
  padding: 108px 16px 24px;
  height: 100%;
  background-color: ${({ theme }) => theme.color.white};
`;

const Footer = styled.View`
  flex: 1;
  gap: 12px;
  position: absolute;
  bottom: 24px;
  left: 16px;
  right: 16px;
`;

export default SignInScreen;
