import { User } from "~/types/auth.types";

export interface WebViewMessageMap {
  Request: {
    GO_BACK: null;
    LOGIN_SUCCESS: User;
  };
  Response: {
    NEW_NOTIFICATION: string;
    PUSH_NOTIFICATION: string;
  };
}

export type WebViewMessageType<T extends keyof WebViewMessageMap> = keyof WebViewMessageMap[T];

export type WebViewMessageData<
  T extends keyof WebViewMessageMap,
  K extends keyof WebViewMessageMap[T]
> = WebViewMessageMap[T][K];

export type WebViewMessageRequest<T extends WebViewMessageType<"Request">> = T extends unknown
  ? { type: T; data: WebViewMessageData<"Request", T> }
  : never;

export type WebViewMessageResponse<T extends WebViewMessageType<"Response">> = {
  type: T;
  data: WebViewMessageData<"Response", T>;
};
