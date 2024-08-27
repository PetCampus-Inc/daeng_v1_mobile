import { SafeAreaView } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { RecoilRoot } from "recoil";

import HomeScreen from "~/screens/HomeScreen";
import ImageSaveProgressView from "~/views/ImageSaveProgressView";
import "~/styles/global.css";

function App(): React.JSX.Element {
  return (
    <RecoilRoot>
      <SafeAreaProvider>
        <SafeAreaView className="flex-1">
          <HomeScreen />
        </SafeAreaView>

        <ImageSaveProgressView />
      </SafeAreaProvider>
    </RecoilRoot>
  );
}

export default App;
