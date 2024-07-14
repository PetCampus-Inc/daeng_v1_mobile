import React, { useRef } from "react";
import useSaveImage from "~/hooks/useSaveImage";
import { runCamera } from "~/native/camera";
import useGetMessage from "~/hooks/useGetMessage";
import { usePostMessage } from "~/hooks/usePostMessage";
import WebView, { type WebViewElement } from "~/components/WebView/WebView";
import { MessageType, WebViewMessageGet } from "~/types/message.types";
import useSelectImage from "~/hooks/useSelectImage";

const HomeScreen = () => {
  const webviewRef = useRef<WebViewElement>(null);

  const { save } = useSaveImage({ webviewRef });
  const { post } = usePostMessage({ webviewRef });
  const { select } = useSelectImage({ webviewRef });

  const handleSubscribe = <T extends MessageType["GET"]>({ type, data }: WebViewMessageGet<T>) => {
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
    }
  };

  const { onMessage } = useGetMessage({
    onSubscribe: handleSubscribe
  });

  const handleLoadEnd = () => {
    post("IS_APP", true);
  };

  return <WebView ref={webviewRef} onMessage={onMessage} onLoadEnd={handleLoadEnd} path="/login" />;
};

export default HomeScreen;
