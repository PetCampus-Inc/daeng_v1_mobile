import { RefObject, useCallback, useEffect } from "react";
import { useRecoilValue } from "recoil";

import { WebViewElement } from "~/components/WebView";
import usePostMessage from "~/hooks/webview/usePostMessage";
import { loginState, userState } from "~/store/user";

/**
 * 로그인 인증이 완료된 경우, WebView에 인증 데이터를 전달합니다.
 * @param webviewRef 참조할 WebView 요소입니다.
 * @param isWebViewLoaded WebView의 로드 여부입니다.
 */
const usePostAuthData = (webviewRef: RefObject<WebViewElement>, isWebViewLoaded: boolean) => {
  const { postMessage } = usePostMessage({ webviewRef });

  const user = useRecoilValue(userState);
  const isLogin = useRecoilValue(loginState);
  const isPrepared = user && user !== "pending" && isLogin && isWebViewLoaded;

  const handleAuthenticated = useCallback(() => {
    if (!isPrepared) return;
    console.log(user);
    postMessage("AUTH_DATA", user);
  }, [postMessage, isPrepared, user]);

  useEffect(() => {
    if (isPrepared) handleAuthenticated();
  }, [isPrepared, handleAuthenticated]);
};

export default usePostAuthData;
