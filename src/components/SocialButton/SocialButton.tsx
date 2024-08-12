import AppleSymbol from "assets/svg/apple-logo.svg";
import GoogleSymbol from "assets/svg/google-logo.svg";
import KakaoSymbol from "assets/svg/kakao-logo.svg";
import React from "react";
import { TouchableOpacityProps } from "react-native";

import Button from "~/components/Button";
import { FirebaseProvider } from "~/types/auth.types";

interface SocialButtonProps extends TouchableOpacityProps {
  className?: string;
  social: "ADMIN" | FirebaseProvider;
  isLastLogin?: boolean;
}

const socials = {
  ADMIN: {
    label: "관리자로 시작하기",
    className: "bg-primary",
    labelClassName: "text-white font-bold",
    icon: null
  },
  KAKAO: {
    label: "카카오로 시작하기",
    className: "bg-[#FEE500]",
    labelClassName: "text-black opacity-[0.85]",
    icon: <KakaoSymbol width={18} height={18} />
  },
  GOOGLE: {
    label: "Google로 시작하기",
    className: "bg-white border-[#cbcbcb]",
    labelClassName: "text-black opacity-[0.54] font-roboto",
    icon: <GoogleSymbol width={18} height={18} />
  },
  APPLE: {
    label: "Apple로 시작하기",
    className: "bg-black",
    labelClassName: "text-white",
    icon: <AppleSymbol width={18} height={18} />
  }
};

const SocialButton = ({ social, ...props }: SocialButtonProps) => {
  return <Button {...socials[social]} {...props} />;
};

export default SocialButton;
