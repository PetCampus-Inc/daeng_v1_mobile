import { WEBVIEW_USER_AGENT } from "@env";
import { WebViewProps } from "react-native-webview";

export const configureWebViewSetting: WebViewProps = {
  /** 유저 에이전트 */
  userAgent: WEBVIEW_USER_AGENT,
  /** 화이트 리스트 */
  originWhitelist: ["*"],
  /** 터치 및 스크롤 바운스 */
  bounces: false,
  /** 페이지 크기 조정 */
  scalesPageToFit: false,
  /** 콘텐츠 인셋 자동 조정 */
  automaticallyAdjustContentInsets: false,
  /** 인라인 미디어 재생 */
  allowsInlineMediaPlayback: true,
  /** 디버깅 */
  webviewDebuggingEnabled: __DEV__,
  /** 키보드 액세서리 뷰 숨기기 */
  hideKeyboardAccessoryView: true,
  /** 쿠키 공유 */
  sharedCookiesEnabled: true
  /** IOS 뒤로가기 제스처  */
  // allowsBackForwardNavigationGestures,
};
