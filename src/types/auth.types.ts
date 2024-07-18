export type SignInMethod = "admin" | "kakao" | "google" | "apple";

export interface FirebaseAuthResponse {
  deviceId: string;
  idToken: string;
}
