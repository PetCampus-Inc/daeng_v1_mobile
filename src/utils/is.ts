import { z } from "zod";

import { WebViewMessage } from "~/types/message.types";
import { AdminRole, MemberRole, Role } from "~/types/role.types";

/**
 * WebView Message Type Guard
 */
const validators = {
  // CORE
  GO_BACK: z.null(),

  // DEVICE ACTION
  CALL: z.string(),
  SELECT_IMAGE: z.null(),
  LAUNCH_CAMERA: z.null(),
  SAVE_IMAGE: z.union([z.string(), z.array(z.string())])
} as const;

export const isValidMessageData = (message: WebViewMessage): message is WebViewMessage => {
  const { type, data } = message;
  const schema = validators[type];
  return schema.safeParse(data).success;
};

export const isWebViewMessage = (obj: unknown): obj is WebViewMessage => {
  return obj !== null && typeof obj === "object" && "type" in obj && "data" in obj;
};

/**
 * Custom Error Type Guard
 */
const CustomAxiosErrorSchema = z.object({
  status: z.number(),
  data: z.object({
    status: z.number(),
    message: z.string(),
    code: z.string()
  })
});

export type CustomAxiosError = z.infer<typeof CustomAxiosErrorSchema>;

export const isCustomAxiosError = (error: unknown): error is CustomAxiosError => {
  return CustomAxiosErrorSchema.safeParse(error).success;
};

export function isValidRole(role: string): role is Role {
  return Object.values(Role).includes(role as Role);
}

export function isValidMemberRole(role: string): role is MemberRole {
  return Object.values(MemberRole).includes(role as MemberRole);
}

export function isValidAdminRole(role: string): role is AdminRole {
  return Object.values(AdminRole).includes(role as AdminRole);
}
