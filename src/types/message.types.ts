export type SocialLoginMessage = {
  GET: {
    KAKAO_LOGIN: null;
    GOOGLE_LOGIN: null;
    APPLE_LOGIN: null;
  };
  POST: {
    KAKAO_LOGIN_SUCCESS: boolean;
    GOOGLE_LOGIN_SUCCESS: boolean;
    APPLE_LOGIN_SUCCESS: boolean;
  };
};

export type NativeMessage = {
  GET: {
    SAVE_IMAGE: string | string[];
    SELECT_IMAGE: null;
    RUN_CAMERA: null;
  };
  POST: {
    IS_APP: boolean;
    SAVE_IMAGE_SUCCESS: boolean;
    SAVE_IMAGE_PROGRESS: number;
    SELECT_IMAGE_SUCCESS: string[] | boolean;
  };
};

export type Message = {
  GET: SocialLoginMessage["GET"] & NativeMessage["GET"];
  POST: SocialLoginMessage["POST"] & NativeMessage["POST"];
};

export type MessageType = {
  GET: keyof Message["GET"];
  POST: keyof Message["POST"];
};

// ----------------------------------------------------------------------------------
//
// ----------------------------------------------------------------------------------

export type WebViewMessageGet<T extends MessageType["GET"] = MessageType["GET"]> = T extends any
  ? { type: T; data: Message["GET"][T] }
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
    KAKAO_LOGIN: (data) => data === null,
    GOOGLE_LOGIN: (data) => data === null,
    APPLE_LOGIN: (data) => data === null
  };

  return type in validators && validators[type](data);
};
