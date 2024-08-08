import { postRefreshToken } from "~/apis/auth";

const tokenRegex = /^Bearer\s/;

const useTokenProvider = () => {
  const verifyAndRefreshToken = async (accessToken: string): Promise<string> => {
    try {
      const { headers } = await postRefreshToken(accessToken);
      const newAccessToken = headers.authorization.replace(tokenRegex, "");
      return newAccessToken;
    } catch (error) {
      throw new Error(`Failed to refresh token: ${error}`);
    }
  };

  return { verifyAndRefreshToken };
};

export default useTokenProvider;
