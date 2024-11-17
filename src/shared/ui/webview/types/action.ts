import { SocialAuthData, SocialProvider } from "@_shared/lib/firebase/auth";

export interface NativeActionMap {
  CALL: {
    request: string;
    response: null;
  };
  SAVE_MEDIA: {
    request: string;
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
  QR_CODE_SCANNER: {
    request: null;
    response: {
      schoolId: number;
      schoolName: string;
    };
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

export type NativeActionType = keyof NativeActionMap;

export type NativeActionData<T extends NativeActionType> = NativeActionMap[T];

export type NativeActionRequest = {
  [T in NativeActionType]: {
    id: string;
    action: T;
    payload: NativeActionData<T>["request"];
  };
}[NativeActionType];

export type NativeActionResponse<T extends NativeActionType> = {
  id: string;
  status: "SUCCESS" | "ERROR";
  action: T;
  payload: NativeActionData<T>["response"];
};
