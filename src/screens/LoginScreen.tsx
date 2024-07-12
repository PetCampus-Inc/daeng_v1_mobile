import React, { useEffect, useState } from "react";
import { getProfile, login } from "@react-native-seoul/kakao-login";
import SplashScreen from "react-native-splash-screen";
import SocialButton from "~/components/SocialButton/SocialButton";
import { getUniqueId } from "react-native-device-info";
import Flex from "~/components/Flex/Flex";
import styled from "styled-components/native";
import { Text } from "react-native";
import useLogin from "~/hooks/useLogin";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env";

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID
  });
};

const LoginScreen = () => {
  const [lastLogin, setLastLogin] = useState<"kakao" | "google" | "apple" | null>(null);
  const [uniqueId, setUniqueId] = useState<string>("");

  const { kakaoLogin, googleLogin } = useLogin();

  useEffect(() => {
    const fetchLastLogin = async () => {
      const uniqueId = await getUniqueId();
      setUniqueId(uniqueId);

      // 마지막 로그인 조회 API 호출
    };

    googleSigninConfigure();
    fetchLastLogin();
    SplashScreen.hide();
  }, []);

  return (
    <StyledLoginScreen>
      <Flex>
        <Text>우리 강아지의 유치원</Text>
        <Text>생활을 보러 갈까요?</Text>
      </Flex>

      <Flex gap={8}>
        <SocialButton social="kakao" onPress={kakaoLogin} />
        <SocialButton social="google" onPress={googleLogin} />
        <SocialButton social="apple" />
      </Flex>

      <Flex>
        <SocialButton social="admin" />
      </Flex>
    </StyledLoginScreen>
  );
};

const StyledLoginScreen = styled.View`
  padding: 16px;
`;

export default LoginScreen;
