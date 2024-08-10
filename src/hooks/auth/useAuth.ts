import { useCallback, useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";

import useTokenProvider from "~/hooks/auth/useTokenProvider";
import useFirebaseAuth from "~/hooks/useFirebaseAuth";
import { loginState, userState } from "~/store/user";
import { UserInfo } from "~/types/auth.types";
import { isMemberRole } from "~/utils/is";

interface AuthParams {
  onAuthenticated?: (user: UserInfo) => void;
  onUnauthenticated?: (error: Error) => void;
  onFinally?: () => void;
}

const useAuth = ({ onAuthenticated, onUnauthenticated, onFinally }: AuthParams) => {
  const user = useRecoilValue(userState);
  const [isLogin, setIsLogin] = useRecoilState(loginState);

  const verifyAndRefreshToken = useTokenProvider();
  const { getFirebaseToken } = useFirebaseAuth();

  const verifyUser = useCallback(async () => {
    if (user === "pending") return;

    if (!user) {
      onUnauthenticated?.(new Error("User is not found"));
      setIsLogin(false);
      onFinally?.();
      return;
    }

    if (isLogin) {
      onFinally?.();
      return;
    }

    try {
      // 토큰 검증
      const validAccessToken = await verifyAndRefreshToken(user.accessToken);
      if (!validAccessToken) throw new Error("Invalid access token");

      // 멤버일 경우 Firebase IDToken 검증
      const idToken = await getFirebaseToken();
      if (isMemberRole(user.role) && !idToken) throw new Error("IDToken is not found");

      setIsLogin(true);
      onAuthenticated?.(user);
    } catch (error) {
      console.error(error);
      onUnauthenticated?.(new Error("Invalid access token"));
    } finally {
      onFinally?.();
    }
  }, [
    user,
    isLogin,
    verifyAndRefreshToken,
    onAuthenticated,
    onUnauthenticated,
    onFinally,
    setIsLogin,
    getFirebaseToken
  ]);

  useEffect(() => {
    verifyUser();
  }, [verifyUser]);
};

export default useAuth;
