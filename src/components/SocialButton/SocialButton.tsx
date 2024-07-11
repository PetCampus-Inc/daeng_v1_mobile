import React from "react";
import { StyledSocialButton } from "./styles";

type Social = "kakao" | "google" | "apple";
interface SocialButtonProps {
  social: Social;
}

const SocialButton = ({ social }: SocialButtonProps) => {
  const socials = {
    kakao: {
      label: "카카오로 계속하기",
      color: "rgba(0, 0, 0, 0.85)",
      bgColor: "#FEE500",
      src: "images/kakao-logo.png",
      alt: "kakao-logo"
    },
    google: {
      label: "Google로 계속하기",
      color: "rgba(0, 0, 0, 0.54)",
      bgColor: "#fff",
      borderColor: "#CCCCCC",
      src: "images/google-logo.png",
      alt: "google-logo"
    },
    apple: {
      label: "Apple로 로그인",
      color: "#fff",
      bgColor: "#000",
      src: "images/apple-logo.png",
      alt: "apple-logo"
    }
  };

  const { label, src, alt, ...styles } = socials[social];

  return (
    <StyledSocialButton {...styles}>
      <img src={src} alt={alt} />
      <span>{label}</span>
    </StyledSocialButton>
  );
};

export default SocialButton;
