import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChevronLeft from "assets/svg/chevron-left.svg";
import React from "react";
import { TouchableOpacity } from "react-native";

import AdminLoginScreen from "~/screens/AdminLoginScreen";
import AdminSignUpScreen from "~/screens/AdminSignUpScreen";
import LoginScreen from "~/screens/LoginScreen";

const Stack = createNativeStackNavigator<LoginStackParams>();

export type LoginStackParams = {
  Login: undefined;
  AdminLogin: undefined;
  AdminSignUp: undefined;
};

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity className="w-6 h-6" onPress={() => navigation.goBack()}>
      <ChevronLeft className="text-foreground" color="#000" />
    </TouchableOpacity>
  );
};

const LoginNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="AdminLogin"
        component={AdminLoginScreen}
        options={{
          title: "",
          headerShown: true,
          headerShadowVisible: false,
          headerBackTitleVisible: false,
          headerLeft: BackButton
        }}
      />
      <Stack.Screen name="AdminSignUp" component={AdminSignUpScreen} />
    </Stack.Navigator>
  );
};

export default LoginNavigator;
