import React from 'react';
import {SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <WebView
        source={{
          //uri: 'https://webapp.knock-dog.net/'
          uri: 'http://localhost:3000/',
        }}
      />
    </SafeAreaView>
  );
}

export default App;
