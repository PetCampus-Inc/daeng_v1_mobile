import { ViewProps } from "react-native";
import styled from "styled-components/native";

export interface StyledFlexProps extends ViewProps {
  flexDirection?: "row" | "column";
  gap?: number;
}

export const StyledFlex = styled.View<StyledFlexProps>`
  flex: 1;
  gap: ${({ gap }) => (gap ? gap : 0)}px;
  flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : "row")};
`;
