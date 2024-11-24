import { Bridge } from "@_shared/lib/bridge/types";
import { SocialProvider } from "@_shared/lib/firebase/auth";
import firebaseSocialAuth from "@_shared/lib/firebase/auth/lib/firebaseSocialAuth";
import { getFcmToken } from "@_shared/lib/firebase/messaging";
import { connectCall, runCamera, saveMedia, selectImage } from "@_shared/lib/native";
import { removeRefreshToken, saveRefreshToken } from "@_shared/lib/refresh-token-storage";

export const webViewBridge: Bridge = {
  call: async (telNumber: string) => connectCall(telNumber),
  getIdToken: (provider: SocialProvider) => firebaseSocialAuth(provider),
  getFcmToken,
  selectImage,
  saveMedia,
  runCamera,
  saveRefreshToken,
  removeRefreshToken
};
