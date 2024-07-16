import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect, useState, useCallback } from "react";
import SplashScreen from "react-native-splash-screen";

import AdminLoginScreen from "~/screens/AdminLoginScreen";
import HomeScreen from "~/screens/HomeScreen";
import SignInScreen from "~/screens/SignInScreen";

const Stack = createNativeStackNavigator<RootStackParam>();
const FirebaseAuth = auth();

export type RootStackParam = {
  Home: { token: string };
  SignIn: undefined;
  AdminLogin: undefined;
};

const AppRouter: React.FC = () => {
  const [initializing, setInitializing] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const handleAuthStateChanged = useCallback(
    async (user: FirebaseAuthTypes.User | null) => {
      if (user) {
        try {
          await user.reload();

          const newToken = await user.getIdToken(true);
          setToken(newToken);
        } catch (error) {
          console.error("[Firebase Auth]", error);
          await FirebaseAuth.signOut();
          setToken(null);
        }
      } else {
        setToken(null);
      }

      if (initializing) setInitializing(false);
      SplashScreen.hide();
    },
    [initializing]
  );

  useEffect(() => {
    const unsubscribe = FirebaseAuth.onAuthStateChanged(handleAuthStateChanged);
    return () => unsubscribe();
  }, [handleAuthStateChanged]);

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
