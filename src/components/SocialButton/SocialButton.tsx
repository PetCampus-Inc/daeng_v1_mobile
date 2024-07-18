import AppleSymbol from "assets/svg/apple-logo.svg";
import GoogleSymbol from "assets/svg/google-logo.svg";
import KakaoSymbol from "assets/svg/kakao-logo.svg";
import React from "react";
import { TouchableOpacityProps } from "react-native";

import * as S from "./styles";

import Text from "~/components/Text/Text";
import { colors, TypographyType } from "~/styles/theme";
import { SignInMethod } from "~/types/auth.types";

interface SocialButtonProps extends TouchableOpacityProps {
  social: SignInMethod;
  lastLogin?: boolean;
}

interface SocialStyleOptions {
  label: string;
  color: string;
  bgColor: string;
  typo?: TypographyType;
  borderColor?: string;
  fontFamily?: string;
}

const SocialButton = ({ social, lastLogin, ...props }: SocialButtonProps) => {
  const socials: { [key: string]: SocialStyleOptions } = {
    admin: {
      label: "관리자로 시작하기",
      color: colors.white,
      bgColor: colors.primaryColor,
      typo: "label1_16_B"
    },
    kakao: {
      label: "카카오로 시작하기",
      color: "rgba(0, 0, 0, 0.85)",
      bgColor: "#FEE500"
    },
    google: {
      label: "Google로 시작하기",
      color: "rgba(0, 0, 0, 0.54)",
      bgColor: "#fff",
      borderColor: "#CCCCCC",
      fontFamily: "Roboto-Medium"
    },
    apple: {
      label: "Apple로 시작하기",
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

  const { label, typo, color, fontFamily, ...styles } = socials[social];
  return (
    <S.SocialButton lastLogin={lastLogin} {...styles} {...props}>
      <S.IconWrap>{symbolSVG[social]}</S.IconWrap>
      <Text typo={typo ?? "label1_16_R"} color={color} fontFamily={fontFamily}>
        {label}
      </Text>
    </S.SocialButton>
  );
};

export default SocialButton;
