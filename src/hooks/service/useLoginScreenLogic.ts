import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useMemo } from "react";
import { Platform } from "react-native";
import { getUniqueId } from "react-native-device-info";
import { useSetRecoilState } from "recoil";

import useFirebaseAuth from "~/hooks/auth/useFirebaseAuth";
import useFirebaseProvider from "~/hooks/auth/useFirebaseProvider";
import useLogin from "~/hooks/auth/useLogin";
import { LoginStackParams } from "~/navigator/LoginNavigator";
import { RootStackParams } from "~/navigator/RootNavigator";
import { loadingState } from "~/store/loading";
import { FirebaseProvider } from "~/types/auth.types";

const useLoginScreenLogic = () => {
  const loginNavigation = useNavigation<NativeStackNavigationProp<LoginStackParams>>();
  const rootNavigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();
  const lastLoginProvider = useFirebaseProvider();
  const setLoading = useSetRecoilState(loadingState);

  const { memberLogin } = useLogin();
  const { kakaoLogin, googleLogin, appleLogin } = useFirebaseAuth({
    onSuccess: (idToken) => handleSuccessAuth(idToken)
  });

  const handleAdminLogin = () => loginNavigation.navigate("AdminLogin");
  const handleSuccessAuth = async (idToken: string) => {
    try {
      setLoading(true);
      const deviceId = await getUniqueId();
      await memberLogin({ idToken, deviceId });
      rootNavigation.navigate("Home");
    } catch (error) {
      console.error(error);
    }
  };

  const socialButtons = useMemo(
    () => [
      { social: "KAKAO" as FirebaseProvider, onPress: kakaoLogin },
      { social: "GOOGLE" as FirebaseProvider, onPress: googleLogin },
      ...(Platform.OS === "ios"
        ? [{ social: "APPLE" as FirebaseProvider, onPress: appleLogin }]
        : [])
    ],
    [kakaoLogin, googleLogin, appleLogin]
  );

  return { socialButtons, lastLoginProvider, handleAdminLogin };
};

export default useLoginScreenLogic;
