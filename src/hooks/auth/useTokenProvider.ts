import { postRefreshToken } from "~/apis/auth";

const tokenRegex = /^Bearer\s/;

/**
 * 새 액세스 토큰을 발행하는 훅입니다.
 */
const useTokenProvider = () => {
  return async (accessToken: string): Promise<string> => {
    try {
      // TODO: 테스트 후 변경
      if (accessToken === "TEST_ACCESS_TOKEN") return accessToken;
      const { headers } = await postRefreshToken(accessToken);
      const newAccessToken = headers.authorization.replace(tokenRegex, "");
      return newAccessToken;
    } catch (error) {
      throw new Error(`Failed to refresh token: ${error}`);
    }
  };
};

export default useTokenProvider;
