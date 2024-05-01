import React from 'react';
import {SafeAreaView, Dimensions, StyleSheet} from 'react-native';
import WebView from 'react-native-webview';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

function App(): React.JSX.Element {
  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <WebView source={{uri: 'https://webapp.knock-dog.net/'}} />
    </SafeAreaView>
  );
}

export default App;
