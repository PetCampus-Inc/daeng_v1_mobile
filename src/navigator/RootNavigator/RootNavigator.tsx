import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from "@react-navigation/native-stack";
import SplashScreen from "react-native-splash-screen";

import useAuth from "~/hooks/auth/useAuth";
import LoginNavigator from "~/navigator/LoginNavigator";
import HomeScreen from "~/screens/HomeScreen";

const Stack = createNativeStackNavigator<RootStackParams>();

export type RootStackParams = {
  Home: undefined;
  LoginNavigator: undefined;
};

const RootNavigator = () => {
  const { navigate } = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useAuth({
    onUnauthenticated: () => navigate("LoginNavigator"),
    onFinally: () => SplashScreen.hide()
  });

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="LoginNavigator"
        component={LoginNavigator}
        options={{ animation: "slide_from_bottom" }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
