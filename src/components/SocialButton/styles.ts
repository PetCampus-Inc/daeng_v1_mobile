import styled, { css } from "styled-components/native";

interface StyledSocialButtonProps {
  bgColor?: string;
  borderColor?: string;
  lastLogin?: boolean;
}

export const SocialButton = styled.TouchableOpacity<StyledSocialButtonProps>`
  flex-direction: row;
  align-items: center;
  justify-content: center;

  width: 100%;
  height: 50px;
  border-radius: 4px;
  background-color: ${({ bgColor }) => bgColor};
  border: 1px solid ${({ borderColor }) => (borderColor ? borderColor : "transparent")};

  ${({ lastLogin }) =>
    lastLogin &&
    css`
      border: 2px solid red;
    `}
`;

export const IconWrap = styled.View`
  position: absolute;
  left: 16px;
`;

export const ButtonLabel = styled.Text<{ color: string }>`
  font-size: 17px;
  color: ${({ color }) => color};
`;
