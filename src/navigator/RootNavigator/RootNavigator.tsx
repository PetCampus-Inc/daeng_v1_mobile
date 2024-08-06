import { useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp
} from "@react-navigation/native-stack";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

import MainNavigator from "~/navigator/MainNavigator";
import SignInScreen from "~/screens/SignInScreen";
import { idTokenState } from "~/store/idTokenStore";

const Stack = createNativeStackNavigator<RootStackParams>();

export type RootStackParams = {
  Main: undefined;
  SignIn: undefined;
};

const RootNavigator = ({ idToken }: { idToken: string | null }) => {
  const setIdToken = useSetRecoilState(idTokenState);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParams>>();

  useEffect(() => {
    setIdToken(idToken);
    if (idToken !== null) navigation.navigate("Main");
    else navigation.navigate("SignIn");
  }, [idToken, navigation, setIdToken]);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={MainNavigator} />
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ presentation: "containedModal" }}
      />
    </Stack.Navigator>
  );
};

export default RootNavigator;
