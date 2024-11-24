/* eslint-disable @typescript-eslint/no-explicit-any */

/** 비동기 함수 */
export type AsyncFunction = (...args: any[]) => Promise<any>;

/** Bridge */
export type Bridge = Record<string, AsyncFunction>;

/** WebView 메시지 */
export type WebViewMessage =
  | { type: "MESSAGE"; payload: unknown }
  | { type: "LOG"; payload: LogPayload }
  | { type: "BRIDGE"; payload: BridgePayload };

/** Bridge 응답 페이로드 */
export type BridgeResponsePayload = {
  id: string;
  status: "success" | "error";
  method: string;
  response: string | null;
};

/** Log 타입 */
export type LogType = "log" | "info" | "warn" | "error";

/** Log 페이로드 */
export type LogPayload = {
  type: LogType;
  log: unknown[];
};

/** Bridge 페이로드 */
export type BridgePayload = {
  id: string;
  method: string;
  args: unknown[];
};
