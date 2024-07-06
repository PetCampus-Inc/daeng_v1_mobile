import React, { useEffect, useRef } from "react";
import useSavePicture from "~/hooks/useSavePicture";
import { runCamera } from "~/native/camera";
import { selectImage } from "~/native/selectImage";
import { GetMessage } from "~/types/getMessage";
import useGetMessage from "~/hooks/useGetMessage";
import { usePostMessage } from "~/hooks/usePostMessage";
import WebView, { type WebViewElement } from "~/components/WebView/WebView";
import SplashScreen from "react-native-splash-screen";

export const HomeScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  const { save } = useSavePicture({ webviewRef });
  const { post } = usePostMessage({ webviewRef });

  const { onMessage } = useGetMessage({
    onSubscribe: (message) => handleSubscribe(message)
  });

  useEffect(() => SplashScreen.hide(), []);

  const handleSubscribe = ({ type, data }: GetMessage) => {
    const handlers: Record<GetMessage["type"], (data: any) => void> = {
      SAVE_PICTURE: save,
      RUN_CAMERA: runCamera,
      SELECT_IMAGE: selectImage
    };
    return handlers[type](data);
  };

  const handleLoadEnd = () => {
    post({ type: "IS_APP", data: true });
  };

  return <WebView ref={webviewRef} onMessage={onMessage} onLoadEnd={handleLoadEnd} path="/login" />;
};
