import ParentWebView from "react-native-webview";
import styled, { css } from "styled-components";

export const WebView = styled(ParentWebView).withConfig({
  shouldForwardProp: (prop) => !["windowWidth", "windowHeight"].includes(prop)
})<{ windowWidth?: number; windowHeight?: number }>`
  flex: 1;
  width: 100%;
  height: 100%;

  ${({ windowWidth, windowHeight }) => css`
    width: ${windowWidth}px;
    height: ${windowHeight}px;
  `}
`;
