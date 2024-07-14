import React from "react";
import { StyledText, StyledTextProps } from "./Text.styles";

interface TextProps extends StyledTextProps {
  children?: React.ReactNode;
}

const Text = ({ children, ...styles }: TextProps) => {
  return <StyledText {...styles}>{children}</StyledText>;
};

export default Text;
