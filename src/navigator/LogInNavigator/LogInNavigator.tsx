import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChevronLeft from "assets/svg/chevron-left.svg";
import React from "react";
import { Text, TouchableOpacity } from "react-native";

import AdminLoginScreen from "~/screens/AdminLoginScreen";
import LoginScreen from "~/screens/LoginScreen";

const Stack = createNativeStackNavigator<LoginStackParams>();

export type LoginStackParams = {
  Login: undefined;
  AdminLogin: undefined;
};

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity className="w-8 h-8" onPress={() => navigation.goBack()}>
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
    </Stack.Navigator>
  );
};

export default LoginNavigator;
