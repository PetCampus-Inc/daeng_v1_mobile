import { PixelRatio } from "react-native";

export function remCalc(px: number | string) {
  let tempPx: number;

  if (typeof px === "string") {
    tempPx = parseFloat(px.replace(/px/gi, "").trim());
  } else {
    tempPx = px;
  }

  return tempPx / PixelRatio.getFontScale();
}
