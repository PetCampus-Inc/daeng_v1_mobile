import AppleSymbol from "assets/svg/apple-logo.svg";
import GoogleSymbol from "assets/svg/google-logo.svg";
import KakaoSymbol from "assets/svg/kakao-logo.svg";
import React from "react";
import { TouchableOpacityProps, View, Text, TouchableOpacity } from "react-native";

import { FirebaseProvider } from "~/types/auth.types";
import { cn } from "~/utils/cn";

interface SocialButtonProps extends TouchableOpacityProps {
  className?: string;
  social: "ADMIN" | FirebaseProvider;
  isLastLogin?: boolean;
}

const socials = {
  ADMIN: {
    label: "관리자로 시작하기",
    buttonClassName: "bg-primary",
    labelClassName: "text-white text-label-16-b font-bold",
    symbol: null
  },
  KAKAO: {
    label: "카카오로 시작하기",
    buttonClassName: "bg-[#FEE500]",
    labelClassName: "text-black/85 text-label-16",
    symbol: <KakaoSymbol width={18} height={18} />
  },
  GOOGLE: {
    label: "Google로 시작하기",
    buttonClassName: "bg-white border-[#CCCCCC]",
    labelClassName: "text-black/54 text-label-16 font-roboto",
    symbol: <GoogleSymbol width={18} height={18} />
  },
  APPLE: {
    label: "Apple로 시작하기",
    buttonClassName: "bg-black",
    labelClassName: "text-white text-label-16",
    color: "#fff",
    bgColor: "#000",
    symbol: <AppleSymbol width={18} height={18} />
  }
};

const SocialButton = ({ className, social, isLastLogin, ...props }: SocialButtonProps) => {
  const { label, buttonClassName, labelClassName, symbol } = socials[social];
  return (
    <TouchableOpacity
      className={cn(
        "h-[47] items-center justify-center rounded-lg border border-transparent",
        className,
        buttonClassName
      )}
      {...props}
    >
      <View className="absolute left-4">{symbol}</View>
      <Text className={labelClassName}>{label}</Text>
    </TouchableOpacity>
  );
};

export default SocialButton;
