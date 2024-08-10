import { Role } from "~/types/role.types";
import { Status } from "~/types/status.type";

export type FirebaseProvider = "GOOGLE" | "APPLE" | "KAKAO";

export interface FirebaseAuthData {
  idToken: string;
  deviceId: string;
}

export interface UserInfo {
  accessToken: string;
  role: Role;
  status: Status;
}
