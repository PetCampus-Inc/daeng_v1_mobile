import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { MainScreen } from "@_screens/MainScreen";
import { StackScreen } from "@_screens/StackScreen";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Main: undefined;
  Stack: { path: string; state?: any };
};

export const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Stack" component={StackScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
