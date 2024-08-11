import { z } from "zod";

import { WebViewMessage } from "~/types/message.types";
import { AdminRole, MemberRole, Role } from "~/types/role.types";
import { Status } from "~/types/status.type";

/**
 * WebView Message Type Guard
 */
const validators = {
  // CORE
  GO_BACK: z.null(),
  LOGOUT: z.null(),
  ADMIN_LOGIN: z.object({
    id: z.string(),
    password: z.string()
  }),

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

export function isStatus(status: string): status is Status {
  return Object.values(Status).includes(status as Status);
}

export function isRole(role: string): role is Role {
  return Object.values(Role).includes(role as Role);
}

export function isMemberRole(role: string): role is MemberRole {
  return Object.values(MemberRole).includes(role as MemberRole);
}

export function isAdminRole(role: string): role is AdminRole {
  return Object.values(AdminRole).includes(role as AdminRole);
}
