import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import useAuthStateChange from "~/hooks/useAuthStateChange";
import AdminLoginScreen from "~/screens/AdminLoginScreen";
import HomeScreen from "~/screens/HomeScreen";
import SignInScreen from "~/screens/SignInScreen";

const Stack = createNativeStackNavigator<RootStackParam>();

export type RootStackParam = {
  Home: { token: string };
  SignIn: undefined;
  AdminLogin: undefined;
};

const AppRouter = () => {
  const { initializing, token } = useAuthStateChange();

  if (initializing) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Home" options={{ headerShown: false }}>
            {(props) => <HomeScreen {...props} token={token} />}
          </Stack.Screen>
        ) : (
          <Stack.Screen name="SignIn" options={{ title: "로그인" }} component={SignInScreen} />
        )}
        <Stack.Screen name="AdminLogin" component={AdminLoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
