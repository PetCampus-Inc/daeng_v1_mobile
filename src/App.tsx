import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView, Text, TouchableOpacity } from "react-native";
import { RecoilRoot } from "recoil";
import { ThemeProvider } from "styled-components/native";

import useFirebaseToken from "~/hooks/useFirebaseToken";
import RootNavigator from "~/navigator/RootNavigator";
import theme from "~/styles/theme";

function App(): React.JSX.Element {
  const { idToken, initializing, signOutFirebase } = useFirebaseToken();

  return (
    <SafeAreaView className="flex-1">
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <NavigationContainer>
            {initializing ? null : <RootNavigator idToken={idToken} />}
          </NavigationContainer>
        </RecoilRoot>
      </ThemeProvider>

      <TouchableOpacity
        className="absolute flex bottom-7 left-8 px-2 py-1 bg-blue-700 rounded-md"
        onPress={signOutFirebase}
      >
        <Text className="text-white">IDToken clear</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default App;
