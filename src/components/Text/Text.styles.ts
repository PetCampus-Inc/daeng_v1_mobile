import styled from "styled-components/native";
import { colors, typography } from "~/styles/theme";

type TypographyType = keyof typeof typography;
type ColorType = keyof typeof colors;
export interface StyledTextProps {
  typo?: TypographyType;
  color?: ColorType | string;
}

export const StyledText = styled.Text<StyledTextProps>`
  ${({ typo }) => typo && typography[typo]}
  ${({ color }) => {
    if (color && colors[color as ColorType]) {
      return `color: ${colors[color as ColorType]};`;
    }
    return `color: ${color};`;
  }}
`;
