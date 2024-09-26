import { WebViewMessageEvent } from "react-native-webview";

/**
 * WebView에서 발생한 console.log를 가져옵니다.
 * @param callbackEvent "CONSOLE" 타입의 이벤트 외 이벤트 처리
 * @returns handleMessageInterceptor onMessage 이벤트 핸들러
 * @returns debuggingScript WebView 디버깅 스크립트
 */
export const useWebviewLog = (callbackEvent?: (event: WebViewMessageEvent) => void) => {
  const handleMessageInterceptor = (event: WebViewMessageEvent) => {
    try {
      const dataPayload = JSON.parse(event.nativeEvent.data);

      if (dataPayload && dataPayload.type === "CONSOLE") {
        console.info(`[WebView] ${JSON.stringify(dataPayload.data)}`);
      } else {
        callbackEvent?.(event);
      }
    } catch (e) {}
  };

  const debuggingScript = `
    (function() {
      const originalConsole = { ...console };
      const consoleLog = (type, ...args) => {
        originalConsole[type](...args);
        window.ReactNativeWebView.postMessage(JSON.stringify({
          'type': 'CONSOLE',
          'data': {'type': type, 'log': args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg)}
        }));
      };

      console = {
        log: (...args) => consoleLog('log', ...args),
        debug: (...args) => consoleLog('debug', ...args),
        info: (...args) => consoleLog('info', ...args),
        warn: (...args) => consoleLog('warn', ...args),
        error: (...args) => consoleLog('error', ...args),
      };
    })();
  `;

  return { handleMessageInterceptor, debuggingScript };
};
