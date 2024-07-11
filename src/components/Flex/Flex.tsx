import React from "react";
import { View } from "react-native";
import { StyledFlexProps } from "~/components/Flex/styles";

interface FlexProps extends StyledFlexProps {
  children?: React.ReactNode;
}

const Flex = ({ children, ...props }: FlexProps) => {
  return <View {...props}>{children}</View>;
};

export default Flex;
