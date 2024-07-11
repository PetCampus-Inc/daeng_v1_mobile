import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import {
  login,
  logout,
  getProfile as getKakaoProfile,
  shippingAddresses as getKakaoShippingAddresses,
  unlink
} from "@react-native-seoul/kakao-login";
import SplashScreen from "react-native-splash-screen";
import SocialButton from "~/components/SocialButton/SocialButton";

const LoginScreen = () => {
  const [result, setResult] = useState<string>("");

  useEffect(() => SplashScreen.hide(), []);

  const signInWithKakao = async (): Promise<void> => {
    try {
      const token = await login();
      setResult(JSON.stringify(token));
    } catch (err) {
      console.error("login err", err);
    }
  };

  return (
    <View style={styles.container}>
      <SocialButton social="kakao" />
      <SocialButton social="google" />
      <SocialButton social="apple" />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 100
  },
  resultContainer: {
    flexDirection: "column",
    width: "100%",
    padding: 24
  },
  button: {
    backgroundColor: "#FEE500",
    borderRadius: 40,
    borderWidth: 1,
    width: 250,
    height: 40,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginTop: 10
  },
  text: {
    textAlign: "center"
  }
});
