import { SocialAuthData, SocialProvider } from "~/types/auth.types";

export interface EventMessage {
  Request: {
    CALL: string;
    SAVE_IMAGE: string | string[];
    SELECT_IMAGE: null;
    LAUNCH_CAMERA: null;
    FCM_TOKEN: null;
    SOCIAL_LOGIN: SocialProvider;
  };
  Response: {
    CALL: null;
    SAVE_IMAGE: null;
    SELECT_IMAGE: string[];
    LAUNCH_CAMERA: string;
    FCM_TOKEN: string;
    SOCIAL_LOGIN: SocialAuthData;
    ERROR: string;
  };
}

export type MessageType = {
  [K in "Request" | "Response"]: keyof EventMessage[K];
};

export type MessageDataType = {
  Request: EventMessage["Request"][MessageType["Request"]];
  Response: EventMessage["Response"][MessageType["Response"]];
};

export type WebViewMessage<T extends MessageType["Request"] = MessageType["Request"]> =
  T extends unknown ? { type: T; data: EventMessage["Request"][T]; requestId: string } : never;
