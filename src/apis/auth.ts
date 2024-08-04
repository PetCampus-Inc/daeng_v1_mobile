import { apiUrl } from "~/config/url";
import { request } from "~/libs/request";
import { SignInMethod } from "~/types/auth.types";

export const getSignInMethod = async (deviceId: string): Promise<SignInMethod> => {
  const url = `${apiUrl}member/firebase/provider`;
  const { data } = await request<SignInMethod>({ url, params: { deviceId } });
  return data;
};
