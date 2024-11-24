import { LogPayload } from "../types";

/**
 * WebView에서 발생한 console.log를 가져옵니다.
 * @param callbackEvent "CONSOLE" 타입의 이벤트 외 이벤트 처리
 * @returns handleMessageInterceptor onMessage 이벤트 핸들러
 * @returns debuggingScript WebView 디버깅 스크립트
 */
export const handleWebViewLog = ({ type, log }: LogPayload) => {
  const webviewPrefix = "[WebView]";
  const message = [webviewPrefix, ...log].join(" ");

  switch (type) {
    case "log":
      console.log(message);
      break;
    case "info":
      console.info(message);
      break;
    case "warn":
      console.warn(message);
      break;
    case "error":
      console.error(message);
      break;
  }
};

export const INJECT_DEBUGGING_SCRIPT = `
(function() {
  const originalConsole = { ...console };
  
  const consoleLog = (type, ...args) => {
    originalConsole[type](...args);
    window.ReactNativeWebView.postMessage(JSON.stringify({
      'type': 'LOG',
      'payload': {'type': type, 'log': args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : arg)}
    }));
  };

  console = {
    log: (...args) => consoleLog('log', ...args),
    info: (...args) => consoleLog('info', ...args),
    warn: (...args) => consoleLog('warn', ...args),
    error: (...args) => consoleLog('error', ...args),
  };
})();
`;
