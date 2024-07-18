import React, { useRef } from "react";
import SplashScreen from "react-native-splash-screen";

import WebView, { type WebViewElement } from "~/components/WebView";
import useGetMessage from "~/hooks/useGetMessage";
import { usePostMessage } from "~/hooks/usePostMessage";
import useSaveImage from "~/hooks/useSaveImage";
import useSelectImage from "~/hooks/useSelectImage";
import { runCamera } from "~/native/camera";
import { WebViewMessageGet } from "~/types/message.types";

interface HomeScreenProps {
  token?: string;
}

const HomeScreen = ({ token }: HomeScreenProps) => {
  const webviewRef = useRef<WebViewElement>(null);

  const { onMessage } = useGetMessage({ onSubscribe: (message) => handleSubscribe(message) });

  const { save } = useSaveImage({ webviewRef });
  const { post } = usePostMessage({ webviewRef });
  const { select } = useSelectImage({ webviewRef });

  const handleSubscribe = ({ type, data }: WebViewMessageGet) => {
    switch (type) {
      case "SAVE_IMAGE":
        save(data);
        break;
      case "SELECT_IMAGE":
        select();
        break;
      case "RUN_CAMERA":
        runCamera();
        break;
      case "GET_ID_TOKEN":
        token && post("ID_TOKEN", token);
        break;
    }
  };

  return (
    <WebView
      ref={webviewRef}
      onLoadEnd={() => SplashScreen.hide()}
      onMessage={onMessage}
      path="/login"
    />
  );
};

export default HomeScreen;
