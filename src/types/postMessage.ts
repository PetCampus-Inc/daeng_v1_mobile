import { MessageTypes, WebViewMessage } from "~/types/message";

export interface PictureDownloadProgress {
  current: number;
  remaining: number;
  total: number;
}

type PostMessageType = {
  SAVE_PICTURE_SUCCESS: boolean;
  SAVE_PICTURE_PROGRESS: string;

  SELECT_IMAGE_SUCCESS: string[] | boolean;
};

export type PostMessage = WebViewMessage<PostMessageType>;

export const isValidWebViewMessage = (message: any): message is PostMessage => {
  if (!message || typeof message !== "object") return false;

  const { type, data } = message;

  const validators: Record<MessageTypes<PostMessageType>, (data: any) => boolean> = {
    SAVE_PICTURE_SUCCESS: (data) => typeof data === "boolean",
    SAVE_PICTURE_PROGRESS: (data) => typeof data === "string",
    SELECT_IMAGE_SUCCESS: (data) =>
      Array.isArray(data)
        ? data.every((item) => typeof item === "string")
        : typeof data === "boolean"
  };

  return type in validators && validators[type as MessageTypes<PostMessageType>](data);
};
