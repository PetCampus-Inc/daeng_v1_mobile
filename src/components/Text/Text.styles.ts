import styled from "styled-components/native";
import { colors, ColorType, typography, TypographyType } from "~/styles/theme";

export interface StyledTextProps {
  typo?: TypographyType;
  color?: ColorType | string;
  fontFamily?: string;
}

export const StyledText = styled.Text<StyledTextProps>`
  ${({ typo }) => typo && typography[typo]}
  ${({ color }) => {
    if (color && colors[color as ColorType]) {
      return `color: ${colors[color as ColorType]};`;
    }
    return `color: ${color};`;
  }}
  ${({ fontFamily }) => fontFamily && `font-family: ${fontFamily};`}
`;
