import { MessageTypes, WebViewMessage } from "~/types/message";

type GetMessageType = {
  SAVE_PICTURE: string[];
  RUN_CAMERA: null;
  SELECT_IMAGE: null;
};

export type GetMessage = WebViewMessage<GetMessageType>;

export const isValidGetMessage = (message: any): message is GetMessage => {
  if (!message || typeof message !== "object") return false;

  const { type, data } = message;

  const validators: Record<MessageTypes<GetMessageType>, (data: any) => boolean> = {
    SAVE_PICTURE: (data) => Array.isArray(data) && data.every((item) => typeof item === "string"),
    RUN_CAMERA: (data) => data === null,
    SELECT_IMAGE: (data) => data === null
  };

  return type in validators && validators[type as MessageTypes<GetMessageType>](data);
};
