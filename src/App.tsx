import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import WebView from "react-native-webview";
import { webviewRef, onMessageFromWebView } from "@utils/index";

function App(): React.JSX.Element {
  useEffect(() => {
    // Platform.OS === 'android'
    //   ? androidRequestPermission()
    //   : iosRequestPermission();
  }, []);

  return (
    <SafeAreaView style={{ height: "100%", width: "100%" }}>
      <WebView
        ref={webviewRef}
        onMessage={onMessageFromWebView}
        source={{
          //uri: 'https://webapp.knock-dog.net/',
          uri: "http://localhost:3000/"
        }}
      />
    </SafeAreaView>
  );
}

export default App;
