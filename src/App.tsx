import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components/native";

import RootNavigator from "~/navigator/RootNavigator";
import theme from "~/styles/theme";

function App(): React.JSX.Element {
  return (
    <SafeAreaView className="flex-1">
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <NavigationContainer>
            <RootNavigator />
          </NavigationContainer>
        </RecoilRoot>
      </ThemeProvider>
    </SafeAreaView>
  );
}

export default App;
