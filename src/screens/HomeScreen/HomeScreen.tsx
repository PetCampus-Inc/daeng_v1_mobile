import React, { useRef } from "react";
import { WebView, WebViewRef } from "~/components/WebView";
import useSavePicture from "~/hooks/useSavePicture";
import { runCamera } from "~/native/camera";
import { selectImage } from "~/native/selectImage";
import { GetMessage } from "~/types/getMessage";
import useGetMessage from "~/hooks/useGetMessage";

export const HomeScreen = () => {
  const webviewRef = useRef<WebViewRef>(null);

  const { save } = useSavePicture({ webviewRef });

  const { onMessage } = useGetMessage({
    onSubscribe: (message) => handleSubscribe(message)
  });

  const handleSubscribe = ({ type, data }: GetMessage) => {
    const handlers: Record<GetMessage["type"], (data: any) => void> = {
      SAVE_PICTURE: save,
      RUN_CAMERA: runCamera,
      SELECT_IMAGE: selectImage
    };
    return handlers[type](data);
  };

  return <WebView onMessage={onMessage} path="/login" />;
};
