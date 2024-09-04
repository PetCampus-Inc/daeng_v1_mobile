import { z } from "zod";

import {
  WebViewMessageRequest,
  WebViewMessageType,
  WebViewMessageData
} from "~/types/message.types";

type RequestDataSchemaType = {
  [K in WebViewMessageType<"Request">]: z.ZodType<WebViewMessageData<"Request", K>>;
};

const requestDataSchema: RequestDataSchemaType = {
  GO_BACK: z.null(),
  LOGIN_SUCCESS: z.null(),
  LOGOUT: z.null(),
  REFRESH_TOKEN: z.null()
} as const;

const MESSAGE_REQUEST_TYPES = Object.keys(requestDataSchema) as WebViewMessageType<"Request">[];

/**
 * 메세지가 `WebViewMessageRequest` 타입인지 확인합니다.
 * @param message - unknown
 * @returns boolean
 */
export function isWebViewMessageRequest<T extends WebViewMessageType<"Request">>(
  message: unknown
): message is WebViewMessageRequest<T> {
  if (typeof message !== "object" || message === null) return false;

  const { type, data } = message as WebViewMessageRequest<T>;
  const isMessageType = typeof type === "string" && MESSAGE_REQUEST_TYPES.includes(type);

  const schema = requestDataSchema[type];
  const isValidateData = schema ? schema.safeParse(data).success : false;

  return isMessageType && isValidateData;
}
