import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { SafeAreaView, View } from "react-native";
import { RecoilRoot } from "recoil";

import LoadingView from "~/components/LoadingView";
import RootNavigator from "~/navigator/RootNavigator";
import "~/styles/global.css";

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "white"
  }
};

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <View className="flex-1">
        <SafeAreaView className="flex-1">
          <NavigationContainer theme={navTheme}>
            <RootNavigator />
          </NavigationContainer>
        </SafeAreaView>
        <LoadingView />
      </View>
    </RecoilRoot>
  );
}

export default App;
