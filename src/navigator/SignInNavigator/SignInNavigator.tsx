import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ChevronLeft from "assets/svg/chevron-left.svg";
import React from "react";
import { TouchableOpacity } from "react-native";

import AdminSignInScreen from "~/screens/AdminSignInScreen";
import SignInScreen from "~/screens/SignInScreen";

const Stack = createNativeStackNavigator<SignInStackParams>();

export type SignInStackParams = {
  SignIn: undefined;
  AdminSignIn: undefined;
};

const BackButton = () => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <ChevronLeft />
    </TouchableOpacity>
  );
};

const SignInNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={SignInScreen} />
      <Stack.Screen
        name="AdminSignIn"
        component={AdminSignInScreen}
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

export default SignInNavigator;
