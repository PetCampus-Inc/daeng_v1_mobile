import { RefObject, useState } from "react";

import { WebViewElement } from "~/components/WebView";
import { usePostMessage } from "~/hooks/usePostMessage";
import saveImage from "~/native/saveImage";

interface SaveImageOptions {
  webviewRef: RefObject<WebViewElement>;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  onProgress?: (progress: number) => void;
}

const useSaveImage = ({
  webviewRef,
  onProgress,
  onSuccess: onComplete,
  onError
}: SaveImageOptions) => {
  const { post } = usePostMessage({ webviewRef });

  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number | null>(null);

  const save = async (imgUrls: string | string[]) => {
    const urls = Array.isArray(imgUrls) ? imgUrls : [imgUrls];
    if (urls.length === 0) return;

    setLoading(true);

    try {
      for (let i = 0; i < urls.length; i++) {
        const current = i + 1;
        const url = urls[i];

        handleProgress(current);
        await saveImage(url);
      }

      handleComplete();
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      handleError(error);
    } finally {
      setLoading(false);
      setProgress(null);
    }
  };

  const handleProgress = (current: number) => {
    setProgress(current);
    post("SAVE_IMAGE_PROGRESS", current);

    onProgress?.(current);
  };

  const handleComplete = () => {
    post("SAVE_IMAGE_SUCCESS", true);
    onComplete?.();
  };

  const handleError = (error: Error) => {
    post("SAVE_IMAGE_SUCCESS", false);
    onError?.(error);
  };

  return { save, loading, progress };
};

export default useSaveImage;
