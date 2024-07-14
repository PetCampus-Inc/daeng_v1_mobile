import React from "react";
import { View } from "react-native";
import { StyledFlexProps } from "~/components/Flex/styles";

interface FlexProps extends StyledFlexProps {
  children?: React.ReactNode;
}

const Flex = ({ children, ...styles }: FlexProps) => {
  return <View {...styles}>{children}</View>;
};

export default Flex;
