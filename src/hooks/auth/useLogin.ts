import { useSetRecoilState } from "recoil";

import { postAdminLogin, postMemberLogin } from "~/apis/auth";
import { userState } from "~/store/user";
import { AdminLoginRequest, MemberLoginRequest, UserInfo } from "~/types/auth.types";
import { isRole } from "~/utils/is";

const useLogin = () => {
  const setUser = useSetRecoilState(userState);

  const setUserAuthData = (authorization: string, role: string): UserInfo => {
    if (!isRole(role)) throw new Error(`Invalid role: ${role}`);

    const newUser: UserInfo = {
      role,
      accessToken: authorization.replace(/^Bearer\s/, "")
    };

    setUser(newUser);
    return newUser;
  };

  const memberLogin = async (request: MemberLoginRequest): Promise<UserInfo> => {
    try {
      // TODO : 테스트 후 변경
      const { headers, data } = await postMemberLogin(request);
      const { authorization } = headers;

      return setUserAuthData(authorization, data.data.role);
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  };

  const adminLogin = async (request: AdminLoginRequest): Promise<UserInfo> => {
    try {
      const { headers, data } = await postAdminLogin(request);
      const { authorization } = headers;

      return setUserAuthData(authorization, data.data.role);
    } catch (error) {
      throw new Error("Login failed");
    }
  };

  return { memberLogin, adminLogin };
};

export default useLogin;
