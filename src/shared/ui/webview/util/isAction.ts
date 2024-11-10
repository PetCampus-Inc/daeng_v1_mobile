import { z } from "zod";

import { NativeActionType, NativeActionRequest, NativeActionData } from "../types/action";

type RequestPayloadSchemaType = {
  [K in NativeActionType]: z.ZodType<NativeActionData<K>["request"]>;
};

const requestPayloadSchema: RequestPayloadSchemaType = {
  CALL: z.string(),
  SELECT_IMAGE: z.null(),
  LAUNCH_CAMERA: z.null(),
  SAVE_MEDIA: z.string(),
  FCM_TOKEN: z.null(),
  SOCIAL_LOGIN: z.union([z.literal("KAKAO"), z.literal("GOOGLE"), z.literal("APPLE")]),
  SCAN_QR_CODE: z.null()
} as const;

const NATIVE_ACTION_TYPES = Object.keys(requestPayloadSchema) as NativeActionType[];

/**
 * 메세지가 `ActionRequest` 타입인지 확인합니다.
 * @param message - unknown
 * @return boolean
 */
export function isNativeActionRequest(message: unknown): message is NativeActionRequest {
  if (typeof message !== "object" || message === null) return false;
  const { id, action, payload } = message as NativeActionRequest;

  const isAction =
    typeof action === "string" && NATIVE_ACTION_TYPES.includes(action as NativeActionType);

  const schema = requestPayloadSchema[action];
  const isActionRequestPayload = schema ? schema.safeParse(payload).success : false;

  return typeof id === "string" && isAction && isActionRequestPayload;
}
