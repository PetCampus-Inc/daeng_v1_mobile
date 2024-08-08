import { Role } from "~/types/role.types";

export type FirebaseProvider = "GOOGLE" | "APPLE" | "KAKAO";

export interface FirebaseAuthData {
  idToken: string;
  deviceId: string;
}

export interface UserInfo {
  isLogin: boolean;
  accessToken: string;
  role: Role;
}
