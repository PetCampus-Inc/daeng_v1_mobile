import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AdminScreen from "~/screens/AdminScreen";
import MemberScreen from "~/screens/MemberScreen";
import SignInScreen from "~/screens/SignInScreen";

const Stack = createNativeStackNavigator<RootStackParams>();

export type RootStackParams = {
  SignInScreen: undefined;
  MemberScreen: undefined;
  AdminScreen: undefined;
};

const AppRouter = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SignInScreen" component={SignInScreen} />
        <Stack.Screen name="MemberScreen" component={MemberScreen} />
        <Stack.Screen name="AdminScreen" component={AdminScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
