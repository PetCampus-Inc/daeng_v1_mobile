import firebaseSocialAuth, { type SocialProvider } from "@_shared/lib/firebase/auth";
import { getFcmToken } from "@_shared/lib/firebase/messaging";

export const socialLogin = async (provider: SocialProvider) => {
  const idToken = await firebaseSocialAuth(provider);
  const fcmToken = await getFcmToken();

  return { idToken, fcmToken };
};
