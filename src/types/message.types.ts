interface ServiceData {
  GET: {
    GET_ID_TOKEN: null;
  };
  POST: {
    IS_APP: string;
    ID_TOKEN: string;
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

export type WebViewMessageGet<T extends MessageType["GET"] = MessageType["GET"]> = T extends any
  ? { type: T; data: MessageData["GET"][T] }
  : never;

export const isValidGetMessage = (message: any): message is WebViewMessageGet => {
  if (!message || typeof message !== "object") return false;

  const { type, data } = message as WebViewMessageGet;

  const validators: Record<MessageType["GET"], (data: any) => boolean> = {
    SAVE_IMAGE: (data) =>
      typeof data === "string" ||
      (Array.isArray(data) && data.every((item) => typeof item === "string")),
    SELECT_IMAGE: (data) => data === null,
    RUN_CAMERA: (data) => data === null,
    GET_ID_TOKEN: (data) => data === null
  };

  return type in validators && validators[type](data);
};
