import React, { useEffect, useState } from "react";

import SocialButton from "~/components/SocialButton/SocialButton";
import { getUniqueId } from "react-native-device-info";
import Flex from "~/components/Flex";
import styled from "styled-components/native";
import useLogin from "~/hooks/useLogin";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { GOOGLE_WEB_CLIENT_ID } from "@env";
import { getSignInMethod } from "~/apis/auth";
import { SignInMethod } from "~/types/auth/signin.types";
import Text from "~/components/Text/Text";
import { TouchableOpacity } from "react-native";

const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID
  });
};

const SignInScreen = () => {
  const [lastLogin, setLastLogin] = useState<SignInMethod | null>(null);

  const { kakaoLogin, googleLogin, emailLogin } = useLogin();

  const handleAdminLogin = () => {
    emailLogin("jsn_@naver.com", "123456");
  };

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
            const isLast = lastLogin === props.social;
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
            <Text typo="label2_14_M">이용약관</Text>
          </TouchableOpacity>
          <Text typo="label2_14_M">|</Text>
          <TouchableOpacity>
            <Text typo="label2_14_M">개인정보 처리 방침</Text>
          </TouchableOpacity>
        </Flex>
        <SocialButton social="admin" onPress={handleAdminLogin} />
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
