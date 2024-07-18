import { apiUrl } from "~/config/url";
import { SignInMethod } from "~/types/auth.types";

export const getSignInMethod = async (uniqueId: string): Promise<SignInMethod> => {
  const queryString = new URLSearchParams({ id: uniqueId }).toString();
  console.log("API 호출: ", `${apiUrl}/auth/sign-in-method/${queryString}`);
  // const response = fetch(`${apiUrl}/auth/sign-in-method/${queryString}` )
  // return response
  return "kakao" as SignInMethod;
};
