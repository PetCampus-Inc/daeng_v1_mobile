import { FirebaseAuthResponse } from "~/types/auth.types";

interface ServiceData {
  GET: {
    FIREBASE_AUTH: null;
  };
  POST: {
    IS_APP: string;
    FIREBASE_AUTH_SUCCESS: FirebaseAuthResponse;
  };
}

interface NativeData {
  GET: {
    SAVE_IMAGE: string | string[];
    SELECT_IMAGE: null;
    RUN_CAMERA: null;
  };
  POST: {
    SAVE_IMAGE_SUCCESS: boolean;
    SAVE_IMAGE_PROGRESS: number;
    SELECT_IMAGE_SUCCESS: string[] | boolean;
  };
}

export interface MessageData {
  GET: NativeData["GET"] & ServiceData["GET"];
  POST: NativeData["POST"] & ServiceData["POST"];
}

export interface MessageType {
  GET: keyof MessageData["GET"];
  POST: keyof MessageData["POST"];
}

// ----------------------------------------------------------------------------------
//
// ----------------------------------------------------------------------------------

export type WebViewMessageGet<T extends MessageType["GET"] = MessageType["GET"]> = T extends unknown
  ? { type: T; data: MessageData["GET"][T] }
  : never;

export const isValidGetMessage = (message: unknown): message is WebViewMessageGet => {
  if (!message || typeof message !== "object") return false;

  const { type, data } = message as WebViewMessageGet;

  const validators: Record<MessageType["GET"], (value: unknown) => boolean> = {
    SAVE_IMAGE: (value) =>
      typeof value === "string" ||
      (Array.isArray(value) && value.every((item) => typeof item === "string")),
    SELECT_IMAGE: (value) => value === null,
    RUN_CAMERA: (value) => value === null,
    FIREBASE_AUTH: (value) => value === null
  };

  return type in validators && validators[type](data);
};
