import React, { useRef } from "react";
import { WebView, WebViewRef } from "@components/WebView";
import { WebViewMessage, useWebViewMessage } from "@hooks/useWebViewMessage";
import useSavePicture from "~/hooks/useSavePicture";
import { usePostMessage } from "~/hooks/usePostMessage";

export const HomeScreen = () => {
  const webviewRef = useRef<WebViewRef>(null);

  const { post } = usePostMessage({ webviewRef });

  const { save } = useSavePicture({
    onProgress: (progress) => {
      const data = JSON.stringify(progress);
      post({ type: "IMAGE_DOWNLOAD_PROGRESS", data });
    }
  });

  const { onMessage } = useWebViewMessage({
    onSubscribe: (message) => handleSubscribe(message)
  });

  const handleSubscribe = (message: WebViewMessage) => {
    switch (message.type) {
      case "IMAGE_DOWNLOAD":
        save(message.data);
        break;
      default:
        console.error("Not Found Type");
    }
  };

  return <WebView onMessage={onMessage} path="/login" />;
};
