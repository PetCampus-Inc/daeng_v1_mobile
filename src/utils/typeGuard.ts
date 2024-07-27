import { MessageType, WebViewMessage } from "~/types/message.types";

export const isWebViewMessage = (obj: unknown): obj is WebViewMessage => {
  return obj !== null && typeof obj === "object" && "type" in obj && "data" in obj;
};

export const isValidMessageData = (message: WebViewMessage): message is WebViewMessage => {
  const { type, data } = message;
  return type in validators && validators[type](data);
};

type ValidatorFunction<T> = (v: unknown) => v is T;

const isNull: ValidatorFunction<null> = (v): v is null => v === null;
const isString: ValidatorFunction<string> = (v): v is string => typeof v === "string";
const isStringArray: ValidatorFunction<string[]> = (v): v is string[] =>
  Array.isArray(v) && v.every(isString);
const isStringOrStringArray: ValidatorFunction<string | string[]> = (v): v is string | string[] =>
  isString(v) || isStringArray(v);

const validators: Record<MessageType["Request"], ValidatorFunction<unknown>> = {
  // CORE
  GO_BACK: isNull,
  GET_ID_TOKEN: isNull,
  GET_DEVICE_ID: isNull,

  // DEVICE ACTION
  CALL: isString,
  SELECT_IMAGE: isNull,
  LAUNCH_CAMERA: isNull,
  SAVE_IMAGE: isStringOrStringArray
};
