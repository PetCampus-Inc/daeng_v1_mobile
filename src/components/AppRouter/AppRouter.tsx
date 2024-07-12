import React, { useEffect, useState } from "react";
import auth, { FirebaseAuthTypes } from "@react-native-firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "~/screens/HomeScreen";
import SignInScreen from "~/screens/SignInScreen";
import SplashScreen from "react-native-splash-screen";

const Stack = createNativeStackNavigator();
const FirebaseAuth = auth();

const AppRouter = () => {
  const [initializing, setInitializing] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  const onAuthStateChanged: FirebaseAuthTypes.AuthListenerCallback = async (user) => {
    if (user) {
      const token = await user.getIdToken();
      setToken(token);
    } else setToken(null);

    if (initializing) {
      setInitializing(false);
    }

    SplashScreen.hide();
  };

  useEffect(() => {
    const subscriber = FirebaseAuth.onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  if (initializing) return null;
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {token ? (
          <Stack.Screen name="Home" component={HomeScreen} />
        ) : (
          <Stack.Screen name="SignIn" component={SignInScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppRouter;
