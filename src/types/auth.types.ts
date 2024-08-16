import { Role } from "~/types/role.types";

export type SocialProvider = "GOOGLE" | "APPLE" | "KAKAO";

export interface SocialAuthData {
  idToken: string;
  deviceId: string;
}

export interface UserInfo {
  accessToken: string;
  role: Role;
}

export interface MemberLoginRequest {
  idToken: string;
  deviceId: string;
}

export interface AdminLoginRequest {
  id: string;
  password: string;
}
