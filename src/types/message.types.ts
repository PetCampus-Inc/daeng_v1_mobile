// ----------------------------------------------------------------------------------
//
// ----------------------------------------------------------------------------------

export interface SaveImageProgress {
  current: number;
  remaining: number;
  total: number;
}

// ----------------------------------------------------------------------------------
//
// ----------------------------------------------------------------------------------

export type PostMessage = {
  IS_APP: boolean;
  SAVE_IMAGE_SUCCESS: boolean;
  SAVE_IMAGE_PROGRESS: SaveImageProgress;
  SELECT_IMAGE_SUCCESS: string[] | boolean;
};

export type GetMessage = {
  SAVE_IMAGE: string | string[];
  SELECT_IMAGE: null;
  RUN_CAMERA: null;
};

export type PostMessageType = keyof PostMessage;
export type GetMessageType = keyof GetMessage;

// ----------------------------------------------------------------------------------
//
// ----------------------------------------------------------------------------------

export type WebViewMessage<T extends GetMessageType = GetMessageType> = T extends any
  ? { type: T; data: GetMessage[T] }
  : never;

export const isValidGetMessage = (message: any): message is WebViewMessage => {
  if (!message || typeof message !== "object") return false;

  const { type, data } = message as WebViewMessage;

  const validators: Record<GetMessageType, (data: any) => boolean> = {
    SAVE_IMAGE: (data) =>
      typeof data === "string" ||
      (Array.isArray(data) && data.every((item) => typeof item === "string")),
    SELECT_IMAGE: (data) => data === null,
    RUN_CAMERA: (data) => data === null
  };

  return type in validators && validators[type](data);
};
