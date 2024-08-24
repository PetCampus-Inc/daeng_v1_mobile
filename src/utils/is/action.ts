import { z } from "zod";

import { ACTION_TYPES, ActionType, ActionRequest, ActionData } from "~/types/action";

type RequestPayloadSchemaType = {
  [K in ActionType]: z.ZodType<ActionData<K>["request"]>;
};

const requestPayloadSchema: RequestPayloadSchemaType = {
  CALL: z.string(),
  SELECT_IMAGE: z.null(),
  LAUNCH_CAMERA: z.null(),
  SAVE_IMAGE: z.array(z.string()),
  FCM_TOKEN: z.null(),
  SOCIAL_LOGIN: z.union([z.literal("KAKAO"), z.literal("GOOGLE"), z.literal("APPLE")])
} as const;

/**
 * 메세지가 `ActionRequest` 타입인지 확인합니다.
 * @param message - unknown
 * @return boolean
 */
export function isActionRequest<T extends ActionType>(
  message: unknown
): message is ActionRequest<T> {
  if (typeof message !== "object" || message === null) return false;
  const { id, action, payload } = message as ActionRequest<T>;

  const isAction = typeof action === "string" && ACTION_TYPES.includes(action as ActionType);

  const schema = requestPayloadSchema[action];
  const isActionRequestPayload = schema ? schema.safeParse(payload).success : false;

  return typeof id === "string" && isAction && isActionRequestPayload;
}
