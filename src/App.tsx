import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";
import { ReadableStream } from "web-streams-polyfill";

import HomeScreen from "~/screens/HomeScreen";

import "react-native-url-polyfill/auto";
import "react-native-get-random-values";

import "~/styles/global.css";

if (typeof global.ReadableStream === "undefined") {
  global.ReadableStream = ReadableStream as unknown as typeof global.ReadableStream;
}

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <HomeScreen />
        </SafeAreaView>
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

export default App;
