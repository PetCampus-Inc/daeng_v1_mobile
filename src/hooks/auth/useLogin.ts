import { useSetRecoilState } from "recoil";

import {
  AdminLoginRequest,
  MemberLoginRequest,
  postAdminLogin,
  postMemberLogin
} from "~/apis/auth";
import { mockPostMemberLogin } from "~/apis/mock_api";
import { userState } from "~/store/user";
import { UserInfo } from "~/types/auth.types";
import { isRole, isStatus } from "~/utils/is";

const useLogin = () => {
  const setUser = useSetRecoilState(userState);

  const setUserAuthData = (authorization: string, role: string, status: string): UserInfo => {
    if (!isRole(role)) throw new Error(`Invalid role: ${role}`);
    if (!isStatus(status)) throw new Error(`Invalid status: ${status}`);

    const newUser: UserInfo = {
      role,
      status,
      accessToken: authorization.replace(/^Bearer\s/, "")
    };

    setUser(newUser);
    return newUser;
  };

  const memberLogin = async (request: MemberLoginRequest): Promise<UserInfo> => {
    try {
      // TODO : 테스트 후 변경
      // const { headers, data } = await postMemberLogin(request);
      const { headers, data } = await mockPostMemberLogin(request);
      const { authorization } = headers;

      return setUserAuthData(authorization, data.data.role, data.data.status);
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  };

  const adminLogin = async (request: AdminLoginRequest): Promise<UserInfo> => {
    try {
      const { headers, data } = await postAdminLogin(request);
      const { authorization } = headers;

      return setUserAuthData(authorization, data.data.role, data.data.status);
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  return { memberLogin, adminLogin };
};

export default useLogin;
