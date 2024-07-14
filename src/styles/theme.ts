import { css } from "styled-components/native";
import { remCalc } from "~/utils/calculator";

export const colors = {
  transparent: "transparent",
  current: "currentColor",
  inherit: "inherit",

  white: "#FFFFFF",
  black: "#000000",
  darkBlack: "#292929",

  gray_1: "#525252",
  gray_2: "#858585",
  gray_3: "#B5B5B5",
  gray_4: "#E9E9E9",
  gray_5: "#F6F6F6",
  BGray: "#F8F6F5",

  primaryColor: "#956F4C",
  br_2: "#C8A584",
  br_3: "#E4CAB1",
  br_4: "#EEE3D9",
  br_5: "#F6F1ED",

  red_1: "#DD5435",
  red_2: "#FAE7E3",
  primary_2: "#F08538",
  primary_3: "#EE7821",
  primary_4: "#FFCD4D",

  green: "#5BBA70",

  yellow_1: "#FFD12D",
  yellow_2: "#FFF0C8",
  yellow_3: "#FFF7E1",

  secondColor: "#D5A4CF",
  thirdColor: "#F9BCDD",
  fourthColor: "#74445A",
  backGroundColor: "#EEE5E8",
  navBg: "#ffc078",
  lightMainColor: "#fdf1e8",
  interfaceBg: "#f7f9fc"
} as const;

const typoCreator = (
  fontSize: string,
  fontWeight: number,
  letterSpacing: string,
  lineHeight: string
) => {
  return css`
    font-size: ${remCalc(fontSize)}px;
    font-weight: ${fontWeight};
    letter-spacing: ${remCalc(letterSpacing)}px;
    line-height: ${remCalc(lineHeight)}px;
  `;
};

export const typography = {
  title1_24_B: typoCreator("24px", 700, "-1.2px", "32px"),
  title1_24_R: typoCreator("24px", 400, "-1.2px", "26px"),
  title2_20_B: typoCreator("20px", 700, "-0.24px", "28px"),
  title2_20_R: typoCreator("20px", 400, "-1.2px", "26px"),
  title3_28_B: typoCreator("28px", 700, "0px", "40px"),
  body1_18_B: typoCreator("18px", 700, "0px", "27px"),
  body1_18_R: typoCreator("18px", 400, "-1.2px", "26px"),
  body2_16_B: typoCreator("16px", 700, "-1.2px", "23px"),
  body2_16_R: typoCreator("16px", 400, "-0.192px", "23px"),
  label1_16_B: typoCreator("16px", 700, "-0.192px", "24px"),
  label1_16_M: typoCreator("16px", 500, "-1.2px", "24px"),
  label1_16_R: typoCreator("16px", 400, "-0.192px", "24px"),
  label2_14_B: typoCreator("14px", 700, "0.28px", "20px"),
  label2_14_M: typoCreator("14px", 500, "0.28px", "25px"),
  label2_14_R: typoCreator("14px", 400, "0.28px", "20px"),
  caption1_12_R: typoCreator("12px", 400, "-0.12px", "17.5px"),
  caption1_12_B: typoCreator("12px", 700, "0.24px", "20px"),
  caption1_10_R: typoCreator("10px", 400, "-0.12px", "17.5px")
} as const;

const theme = {
  color: colors,
  typo: typography
} as const;

export default theme;
