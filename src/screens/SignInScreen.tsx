import React, { useEffect, useState } from "react";

import SocialButton from "~/components/SocialButton/SocialButton";
import { getUniqueId } from "react-native-device-info";
import Flex from "~/components/Flex";
import styled from "styled-components/native";
import { Text } from "react-native";
import useLogin from "~/hooks/useLogin";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env";
import { getSignInMethod } from "~/apis/auth";
import { SignInMethod } from "~/types/auth/signin.types";

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID
  });
};

const SignInScreen = () => {
  const [lastLogin, setLastLogin] = useState<SignInMethod | null>(null);

  const { kakaoLogin, googleLogin } = useLogin();

  useEffect(() => {
    const fetchLastLogin = async () => {
      const uniqueId = await getUniqueId();

      // 마지막 로그인 조회 API 호출
      const method = await getSignInMethod(uniqueId);
      if (method) setLastLogin(method);
      else setLastLogin(null);
    };

    googleSigninConfigure();
    fetchLastLogin();
  }, []);

  const socialButtons = [
    { social: "kakao" as SignInMethod, onPress: kakaoLogin },
    { social: "google" as SignInMethod, onPress: googleLogin },
    { social: "apple" as SignInMethod }
  ];

  return (
    <StyledSignInScreen>
      <Flex>
        <Text>우리 강아지의 유치원</Text>
        <Text>생활을 보러 갈까요?</Text>
      </Flex>

      <Flex gap={8}>
        {socialButtons.map((props) => {
          const isLast = lastLogin === props.social;
          return <SocialButton lastLogin={isLast} {...props} />;
        })}
      </Flex>

      <Flex>
        <SocialButton social="admin" />
      </Flex>
    </StyledSignInScreen>
  );
};

const StyledSignInScreen = styled.View`
  padding: 16px;
`;

export default SignInScreen;
