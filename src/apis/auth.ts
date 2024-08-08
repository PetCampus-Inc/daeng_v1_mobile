import axios, { AxiosResponse } from "axios";

import { apiUrl } from "~/config/url";
import { request, Response } from "~/libs/request";
import { FirebaseProvider } from "~/types/auth.types";
import { AdminRole, MemberRole } from "~/types/role.types";

export interface MemberLoginRequest {
  idToken: string;
  deviceId: string;
}

export interface MemberLoginResponse {
  memberId: number;
  role: MemberRole;
}

export const postMemberLogin = async (
  req: MemberLoginRequest
): Promise<AxiosResponse<Response<MemberLoginResponse>>> => {
  const url = `${apiUrl}member/firebase/login`;
  return await axios.post<Response<MemberLoginResponse>>(url, {
    idToken: req.idToken,
    deviceId: req.deviceId
  });
};

export interface AdminLoginRequest {
  id: string;
  password: string;
}

export const postAdminLogin = async (
  req: AdminLoginRequest
): Promise<AxiosResponse<Response<AdminRole>>> => {
  const url = `${apiUrl}admin/login`;
  return await axios.post<Response<AdminRole>>(url, {
    id: req.id,
    password: req.password
  });
};

export const postVerifyAccessToken = async (
  accessToken: string
): Promise<AxiosResponse<Response>> => {
  const url = `${apiUrl}auth/token`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  return await axios.post<Response>(url, null, { headers });
};

export const postRefreshToken = async (accessToken: string): Promise<AxiosResponse<Response>> => {
  const url = `${apiUrl}auth/refresh`;
  const headers = { Authorization: `Bearer ${accessToken}` };
  return await axios.post<Response>(url, null, { headers });
};

export const getFirebaseProvider = async (deviceId: string): Promise<FirebaseProvider> => {
  const url = `${apiUrl}member/firebase/provider`;
  const { data } = await request<FirebaseProvider>({ url, params: { deviceId } });
  return data;
};
