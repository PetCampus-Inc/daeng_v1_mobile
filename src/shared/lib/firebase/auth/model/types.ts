export type SocialProvider = "GOOGLE" | "APPLE" | "KAKAO";

export interface SocialAuthData {
  idToken: string;
  deviceId: string;
  fcmToken: string;
}
