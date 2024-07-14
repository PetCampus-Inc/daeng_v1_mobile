import { ViewProps } from "react-native";
import styled, { CSSProperties } from "styled-components/native";

export interface StyledFlexProps extends ViewProps {
  flexDirection?: CSSProperties["flexDirection"];
  alignItems?: CSSProperties["alignItems"];
  justifyContent?: CSSProperties["justifyContent"];
  gap?: number;
}

export const StyledFlex = styled.View<StyledFlexProps>`
  flex: 1;
  gap: ${({ gap }) => (gap ? gap : 0)}px;
  align-items: ${({ alignItems }) => (alignItems ? alignItems : "center")};
  justify-content: ${({ justifyContent }) => (justifyContent ? justifyContent : "center")};
  flex-direction: ${({ flexDirection }) => (flexDirection ? flexDirection : "row")};
`;
