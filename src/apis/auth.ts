import axios from "axios";

import { apiUrl } from "~/config/url";
import { request, Response } from "~/libs/request";
import { FirebaseProvider } from "~/types/auth.types";
import { MemberRole } from "~/types/role.types";

export const postMemberLogin = async (req: {
  idToken: string;
  deviceId: string;
}): Promise<{ role: MemberRole; accessToken: string }> => {
  const url = `${apiUrl}member/firebase/login`;

  const { headers, data } = await axios.post<Response<MemberRole>>(url, {
    idToken: req.idToken,
    deviceId: req.deviceId
  });

  const token = headers.authorization;
  const accessToken = token.startsWith("Bearer ") ? token.slice(7) : token;
  return { role: data.data, accessToken };
};

export const getFirebaseProvider = async (deviceId: string): Promise<FirebaseProvider> => {
  const url = `${apiUrl}member/firebase/provider`;
  const { data } = await request<FirebaseProvider>({ url, params: { deviceId } });
  return data;
};
