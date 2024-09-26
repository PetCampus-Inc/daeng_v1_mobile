import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "@_screens/home";
import { LabScreen } from "@_screens/lab/LabScreen";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  Lab: undefined;
};

export const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Lab" component={LabScreen} />
    </Stack.Navigator>
  );
};
