import * as React from "react";

import { SafeAreaView } from "react-native";
import { WebView } from "@components/WebView";
import { useWebViewMessage } from "@hooks/useWebViewMessage";

function App(): React.JSX.Element {
  const { onMessage } = useWebViewMessage();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView onMessage={onMessage} />
    </SafeAreaView>
  );
}

export default App;
