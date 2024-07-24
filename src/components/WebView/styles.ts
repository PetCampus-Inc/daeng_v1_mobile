import ParentWebView from "react-native-webview";
import styled, { css } from "styled-components";

export const StyledWebView = styled(ParentWebView).withConfig({
  shouldForwardProp: (prop) => !["windowWidth", "windowHeight"].includes(prop)
})<{ windowWidth?: number; windowHeight?: number }>`
  ${({ windowWidth, windowHeight }) => css`
    width: ${windowWidth}px;
    height: ${windowHeight}px;
  `}
`;
