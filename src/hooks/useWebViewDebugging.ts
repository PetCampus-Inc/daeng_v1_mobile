import { WebViewMessageEvent } from "react-native-webview";

const useWebViewDebugging = (callbackEvent?: (event: WebViewMessageEvent) => void) => {
  const handleMessageInterceptor = (event: WebViewMessageEvent) => {
    try {
      const dataPayload = JSON.parse(event.nativeEvent.data);
      if (dataPayload) {
        if (dataPayload.type === "CONSOLE") {
          console.info(`[WebView] ${JSON.stringify(dataPayload.data)}`);
        } else {
          callbackEvent?.(event);
        }
      }
    } catch (e) {}
  };

  const debuggingScript = `
    const consoleLog = (type, log) => window.ReactNativeWebView.postMessage(JSON.stringify({'type': 'CONSOLE', 'data': {'type': type, 'log': log}}));
    console = {
        log: (log) => consoleLog('log', log),
        debug: (log) => consoleLog('debug', log),
        info: (log) => consoleLog('info', log),
        warn: (log) => consoleLog('warn', log),
        error: (log) => consoleLog('error', log),
      };
  `;
  return { handleMessageInterceptor, debuggingScript };
};

export default useWebViewDebugging;
