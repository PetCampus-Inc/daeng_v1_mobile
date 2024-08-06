export type FirebaseProvider = "GOOGLE" | "APPLE" | "KAKAO";

export interface FirebaseAuthData {
  idToken: string;
  deviceId: string;
}
