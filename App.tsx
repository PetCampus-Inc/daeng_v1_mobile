import React, {useEffect, useRef} from 'react';
import {SafeAreaView, TouchableOpacity, Platform} from 'react-native';
import WebView from 'react-native-webview';
import {
  iosRequestPermission,
  androidRequestPermission,
  showCamera,
  selectImage,
  webviewRef,
  handleEndLoading,
  handleIsApp,
  onMessageFromWebView,
} from './utils';

function App(): React.JSX.Element {
  useEffect(() => {
    // Platform.OS === 'android'
    //   ? androidRequestPermission()
    //   : iosRequestPermission();
  }, []);

  return (
    <SafeAreaView style={{height: '100%', width: '100%'}}>
      {/* <TouchableOpacity
        style={{
          height: '10%',
          width: '100%',
          backgroundColor: 'black',
        }}
        onPress={handleIsApp}
      /> */}
      <WebView
        ref={webviewRef}
        // // 웹뷰가 앱에 맨 처음 load 시작 되는 함수
        // onLoadStart={() => {
        //   handleEndLoading('start');
        // }}
        // // 웹뷰가 앱에 맨 처음 load 종료 될때 트리거 되는 함수
        // onLoadEnd={() => {
        //   handleEndLoading('end');
        //   handleIsApp();
        // }}
        onMessage={onMessageFromWebView}
        source={{
          //uri: 'https://webapp.knock-dog.net/',
          uri: 'http://localhost:3000/',
        }}
      />
    </SafeAreaView>
  );
}

export default App;
