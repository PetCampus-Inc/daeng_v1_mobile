interface CoreMessage {
  Request: {
    GET_ID_TOKEN: null;
    GET_DEVICE_ID: null;
  };
  Response: {
    IS_APP: string;
    GET_ID_TOKEN: string;
    GET_DEVICE_ID: string;
  };
}

interface DeviceActionMessage {
  Request: {
    SAVE_IMAGE: string | string[];
    SELECT_IMAGE: null;
    LAUNCH_CAMERA: null;
  };
  Response: {
    SAVE_IMAGE: boolean;
    SELECT_IMAGE: string[] | boolean;
    RUN_CAMERA: string;
  };
}

export interface MessageData {
  Request: CoreMessage["Request"] & DeviceActionMessage["Request"];
  Response: CoreMessage["Response"] & DeviceActionMessage["Response"];
}

export interface MessageType {
  Request: keyof MessageData["Request"];
  Response: keyof MessageData["Response"];
}

export type MessageDataType = {
  Request: MessageData["Request"][MessageType["Request"]];
  Response: MessageData["Response"][MessageType["Response"]];
};

// ----------------------------------------------------------------------------------
//
// ----------------------------------------------------------------------------------

export type WebViewMessage<T extends MessageType["Request"] = MessageType["Request"]> =
  T extends unknown ? { type: T; data: MessageData["Request"][T] } : never;

export const isValidMessageData = (message: unknown): message is WebViewMessage => {
  if (!message || typeof message !== "object") return false;

  const { type, data } = message as WebViewMessage;

  const validators: Record<MessageType["Request"], (value: unknown) => boolean> = {
    SAVE_IMAGE: (value) =>
      typeof value === "string" ||
      (Array.isArray(value) && value.every((item) => typeof item === "string")),
    SELECT_IMAGE: (value) => value === null,
    LAUNCH_CAMERA: (value) => value === null,
    GET_ID_TOKEN: (value) => value === null,
    GET_DEVICE_ID: (value) => value === null
  };

  return type in validators && validators[type](data);
};
