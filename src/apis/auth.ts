import { apiUrl } from "~/config/url";
import { request } from "~/libs/request";
import { FirebaseProvider } from "~/types/auth.types";

export const getFirebaseProvider = async (deviceId: string): Promise<FirebaseProvider> => {
  const url = `${apiUrl}member/firebase/provider`;
  const { data } = await request<FirebaseProvider>({ url, params: { deviceId } });
  return data;
};
