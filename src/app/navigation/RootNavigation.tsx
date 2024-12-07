import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { HomeScreen } from "@_screens/HomeScreen";
import { WebViewScreen } from "@_screens/WebViewScreen";

const Stack = createNativeStackNavigator();

export type RootStackParamList = {
  Home: undefined;
  WebView: { path: string; state?: any };
};

export const RootNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="WebView" component={WebViewScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};
