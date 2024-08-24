import { SocialAuthData, SocialProvider } from "~/types/auth.types";

export const ACTION_TYPES = [
  "CALL",
  "SAVE_IMAGE",
  "SELECT_IMAGE",
  "LAUNCH_CAMERA",
  "FCM_TOKEN",
  "SOCIAL_LOGIN"
] as const;

export interface ActionMap {
  CALL: {
    request: string;
    response: null;
  };
  SAVE_IMAGE: {
    request: string[];
    response: null;
  };
  SELECT_IMAGE: {
    request: null;
    response: string[];
  };
  LAUNCH_CAMERA: {
    request: null;
    response: string;
  };
  FCM_TOKEN: {
    request: null;
    response: string;
  };
  SOCIAL_LOGIN: {
    request: SocialProvider;
    response: SocialAuthData;
  };
}

export type ActionType = keyof ActionMap;

export type ActionData<T extends ActionType> = ActionMap[T];

export type ActionRequest<T extends ActionType> = T extends unknown
  ? { id: string; action: T; payload: ActionData<T>["request"] }
  : never;

export type ActionResponse<T extends ActionType> = {
  id: string;
  status: "SUCCESS" | "ERROR";
  action: T;
  payload: ActionData<T>["response"];
};
