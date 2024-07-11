import React from "react";
import { TouchableOpacityProps } from "react-native";
import * as S from "./styles";
import KakaoSymbol from "assets/svg/kakao-logo.svg";
import GoogleSymbol from "assets/svg/google-logo.svg";
import AppleSymbol from "assets/svg/apple-logo.svg";
import colors from "~/styles/colors";

type Social = "admin" | "kakao" | "google" | "apple";
interface SocialButtonProps extends TouchableOpacityProps {
  social: Social;
  lastLogin?: boolean;
}

const SocialButton = ({ social, lastLogin, ...props }: SocialButtonProps) => {
  const socials = {
    admin: {
      label: "관리자로 시작하기",
      color: colors.primaryForeground,
      bgColor: colors.primary
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
      <S.ButtonLabel color={color}>{label}</S.ButtonLabel>
    </S.SocialButton>
  );
};

export default SocialButton;
