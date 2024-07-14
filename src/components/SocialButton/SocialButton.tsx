import React from "react";
import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";
import KakaoSymbol from "assets/svg/kakao-logo.svg";
import GoogleSymbol from "assets/svg/google-logo.svg";
import AppleSymbol from "assets/svg/apple-logo.svg";
import { colors } from "~/styles/theme";
import { SignInMethod } from "~/types/auth/signin.types";
import Text from "~/components/Text/Text";

interface SocialButtonProps extends TouchableOpacityProps {
  social: SignInMethod;
  lastLogin?: boolean;
}

const SocialButton = ({ social, lastLogin, ...props }: SocialButtonProps) => {
  const socials = {
    admin: {
      label: "관리자로 시작하기",
      color: colors.white,
      bgColor: colors.primaryColor
    },
    kakao: {
      label: "카카오로 계속하기",
      color: "rgba(0, 0, 0, 0.85)",
      bgColor: "#FEE500"
    },
    google: {
      label: "Google로 계속하기",
      color: "rgba(0, 0, 0, 0.54)",
      bgColor: "#fff",
      borderColor: "#CCCCCC"
    },
    apple: {
      label: "Apple로 로그인",
      color: "#fff",
      bgColor: "#000"
    }
  };

  const symbolSVG = {
    admin: null,
    kakao: <KakaoSymbol width={18} height={18} />,
    google: <GoogleSymbol width={18} height={18} />,
    apple: <AppleSymbol width={18} height={18} />
  };

  const { label, color, ...styles } = socials[social];
  return (
    <S.SocialButton lastLogin={lastLogin} {...styles} {...props}>
      <S.IconWrap>{symbolSVG[social]}</S.IconWrap>
      <Text typo="label1_16_R" color={color}>
        {label}
      </Text>
    </S.SocialButton>
  );
};

export default SocialButton;
