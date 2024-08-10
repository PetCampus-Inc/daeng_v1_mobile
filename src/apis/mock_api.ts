import { AxiosResponse, InternalAxiosRequestConfig } from "axios";

import { LoginResponse, MemberLoginRequest } from "~/apis/auth";
import { Response } from "~/libs/request";
import { MemberRole } from "~/types/role.types";

export const mockPostMemberLogin = async (
  _: MemberLoginRequest
): Promise<AxiosResponse<Response<LoginResponse<MemberRole>>>> => {
  await new Promise((resolve) => setTimeout(resolve, 100));

  const mockResponse: LoginResponse<MemberRole> = {
    role: "ROLE_ANONYMOUS",
    status: "APPROVAL_PENDING"
  };

  const response: AxiosResponse<Response<LoginResponse<MemberRole>>> = {
    data: {
      data: mockResponse,
      message: "Login successful",
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
