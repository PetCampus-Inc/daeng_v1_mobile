import Svg, { Path } from "react-native-svg";

export const ScannerOverlay = () => {
  return (
    <Svg width="100%" height="100%" viewBox="0 0 100 100" opacity={0.8}>
      {/* 좌상단 */}
      <Path d="M 30 22 C 25.5 22 22 25.5 22 30" stroke="white" strokeWidth="2" fill="none" />
      {/* 우상단 */}
      <Path d="M 70 22 C 74.5 22 78 25.5 78 30" stroke="white" strokeWidth="2" fill="none" />
      {/* 좌하단 */}
      <Path d="M 22 70 C 22 74.5 25.5 78 30 78" stroke="white" strokeWidth="2" fill="none" />
      {/* 우하단 */}
      <Path d="M 70 78 C 74.5 78 78 74.5 78 70" stroke="white" strokeWidth="2" fill="none" />
    </Svg>
  );
};
