import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { ReadableStream } from "web-streams-polyfill";

import { RootNavigation } from "@_app/navigation/RootNavigation";

import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import "./styles/global.css";

if (typeof global.ReadableStream === "undefined") {
  global.ReadableStream = ReadableStream as unknown as typeof global.ReadableStream;
}

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <NavigationContainer>
            <RootNavigation />
          </NavigationContainer>

          {/* <HomeScreen /> */}
        </SafeAreaView>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

export default App;
