import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { AdminLoginRequest, LoginResponse, MemberLoginRequest } from "~/apis/auth";
import { Response } from "~/libs/request";
import { AdminRole, MemberRole } from "~/types/role.types";

export const mockPostMemberLogin = async (
  _: MemberLoginRequest
): Promise<AxiosResponse<Response<LoginResponse<MemberRole>>>> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const mockMemberResponse: LoginResponse<MemberRole> = {
    role: "ROLE_ANONYMOUS",
    status: "APPROVAL_PENDING"
  };

  const response: AxiosResponse<Response<LoginResponse<MemberRole>>> = {
    data: {
      data: mockMemberResponse,
      message: "로그인 성공",
      status: 200
    },
    status: 200,
    statusText: "OK",
    headers: {
      authorization: "Bearer TEST_ACCESS_TOKEN"
    },
    config: {} as InternalAxiosRequestConfig
  };

  return response;
};

export const mockPostAdminLogin = async (
  _: AdminLoginRequest
): Promise<AxiosResponse<Response<LoginResponse<AdminRole>>>> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const mockAdminResponse: LoginResponse<AdminRole> = {
    role: "ROLE_TEACHER",
    status: "APPROVAL_PENDING"
  };

  const response: AxiosResponse<Response<LoginResponse<AdminRole>>> = {
    data: {
      data: mockAdminResponse,
      message: "로그인 성공",
      status: 200
    },
    status: 200,
    statusText: "OK",
    headers: {
      authorization: "Bearer TEST_ACCESS_TOKEN"
    },
    config: {} as InternalAxiosRequestConfig
  };

  return response;
};
