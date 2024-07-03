import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import WebView from "react-native-webview";
import { baseUrl } from "@config/url";

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <WebView
        source={{
          uri: baseUrl
        }}
      />
    </SafeAreaView>
  );
}

export default App;
