import React, {useEffect} from 'react';
import {SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import WebView from 'react-native-webview';
import {
  iosRequestPermission,
  androidRequestPermission,
  showPhoto,
  showCamera,
} from './utils';

function App(): React.JSX.Element {
  useEffect(() => {
    // Platform.OS === 'android'
    //   ? androidRequestPermission()
    //   : iosRequestPermission();
  }, []);

  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      <TouchableOpacity
        style={{
          height: '10%',
          width: '100%',
          backgroundColor: 'black',
        }}
        onPress={showPhoto}
      />
      <WebView
        source={{
          uri: 'https://webapp.knock-dog.net/',
          //uri: 'http://localhost:3000/',
        }}
      />
    </SafeAreaView>
  );
}

export default App;
