import axios, { AxiosResponse } from "axios";

import { apiUrl } from "~/config/url";
import { request, Response } from "~/libs/request";
import { FirebaseProvider } from "~/types/auth.types";
import { AdminRole, MemberRole, Role } from "~/types/role.types";
import { Status } from "~/types/status.type";

export interface LoginResponse<R = Role> {
  role: R;
  status: Status;
}

export interface MemberLoginRequest {
  idToken: string;
  deviceId: string;
}

export interface AdminLoginRequest {
  id: string;
  password: string;
}

export const postMemberLogin = async (
  req: MemberLoginRequest
): Promise<AxiosResponse<Response<LoginResponse<MemberRole>>>> => {
  const url = `${apiUrl}member/firebase/login`;
  return await axios.post<Response<LoginResponse<MemberRole>>>(url, {
    idToken: req.idToken,
    deviceId: req.deviceId
  });
};

export const postAdminLogin = async (
  req: AdminLoginRequest
): Promise<AxiosResponse<Response<LoginResponse<AdminRole>>>> => {
  const url = `${apiUrl}admin/login`;
  return await axios.post<Response<LoginResponse<AdminRole>>>(url, {
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
