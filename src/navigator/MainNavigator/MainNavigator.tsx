import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import AdminScreen from "~/screens/AdminScreen";
import MemberScreen from "~/screens/MemberScreen";

const Stack = createNativeStackNavigator<MainStackParams>();

export type MainStackParams = {
  Member: undefined;
  Admin: undefined;
};

const MainNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Member" component={MemberScreen} />
      <Stack.Screen name="Admin" component={AdminScreen} />
    </Stack.Navigator>
  );
};

export default MainNavigator;
