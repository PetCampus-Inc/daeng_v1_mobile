import React, { useEffect, useState } from "react";
import { getProfile, login } from "@react-native-seoul/kakao-login";
import SplashScreen from "react-native-splash-screen";
import SocialButton from "~/components/SocialButton/SocialButton";
import auth from "@react-native-firebase/auth";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { getUniqueId } from "react-native-device-info";
import { GOOGLE_WEB_CLIENT_ID } from "@env";
import Flex from "~/components/Flex/Flex";
import styled from "styled-components/native";
import { Text } from "react-native";

const firebaseAuth = auth();
const googleSigninConfigure = () => {
  GoogleSignin.configure({
    webClientId: GOOGLE_WEB_CLIENT_ID
  });
};

const useKakaoLogin = () => {
  const kakaoLogin = async (): Promise<void> => {
    const response = await login();
    console.log(response);

    const { id, email } = await getProfile();
    const password = `A!@${id}`;

    firebaseAuth
      .signInWithEmailAndPassword(email, password)
      .then(
        (response) => console.log(response)
        // (fail) => console.log(fail)
      )
      .catch((err) => {
        if (err.code === "auth/invalid-credential") {
          createFirebaseUser(email, password);
        }
      });

    console.log(email, id, password);
    // createFirebaseUser(email, password);
  };

  // S2Jjzb92hJeaz6WyuV3YXacl59D2

  const createFirebaseUser = async (email: string, password: string): Promise<void> => {
    firebaseAuth.createUserWithEmailAndPassword(email, password).then(
      (success) => {
        console.log(success);
      },
      (fail) => {
        console.log(fail);
      }
    );
  };

  return { kakaoLogin };
};

const useGoogleLogin = () => {
  const googleLogin = async (): Promise<void> => {
    try {
      await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
      const { idToken } = await GoogleSignin.signIn();
      // console.log(idToken);
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const res = await auth().signInWithCredential(googleCredential);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return { googleLogin };
};

const LoginScreen = () => {
  const [lastLogin, setLastLogin] = useState<"kakao" | "google" | "apple" | null>(null);
  const [uniqueId, setUniqueId] = useState<string>("");

  const { kakaoLogin } = useKakaoLogin();
  const { googleLogin } = useGoogleLogin();

  useEffect(() => {
    const fetchLastLogin = async () => {
      const uniqueId = await getUniqueId();
      setUniqueId(uniqueId);

      // 마지막 로그인 조회 API 호출
    };

    googleSigninConfigure();
    fetchLastLogin();

    SplashScreen.hide();
  }, []);

  return (
    <StyledLoginScreen>
      <Flex>
        <Text>우리 강아지의 유치원</Text>
        <Text>생활을 보러 갈까요?</Text>
      </Flex>

      <Flex gap={8}>
        <SocialButton social="kakao" onPress={kakaoLogin} />
        <SocialButton social="google" onPress={googleLogin} />
        <SocialButton social="apple" />
      </Flex>

      <Flex>
        <SocialButton social="admin" />
      </Flex>
    </StyledLoginScreen>
  );
};

const StyledLoginScreen = styled.View`
  padding: 16px;
`;

export default LoginScreen;
