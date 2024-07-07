import { useState } from "react";
import { usePostMessage } from "~/hooks/usePostMessage";
import saveImage from "~/native/saveImage";
import { BaseNativeHookOptions } from "~/types/native.types";
import { SaveImageProgress } from "~/types/message.types";

interface SaveImageOptions extends BaseNativeHookOptions {
  onProgress?: (progress: SaveImageProgress) => void;
}

const useSaveImage = ({ webviewRef, onProgress, onComplete, onError }: SaveImageOptions) => {
  const { post } = usePostMessage({ webviewRef });

  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<SaveImageProgress | null>(null);

  const save = async (imgUrls: string | string[]) => {
    const urls = Array.isArray(imgUrls) ? imgUrls : [imgUrls];
    if (urls.length === 0) return;

    setLoading(true);
    const total = urls.length;

    try {
      for (let i = 0; i < urls.length; i++) {
        const current = i + 1;
        const remaining = total - current;
        const url = urls[i];

        handleProgress({ current, remaining, total });
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

  const handleProgress = (progress: SaveImageProgress) => {
    setProgress(progress);
    post("SAVE_IMAGE_PROGRESS", progress);

    onProgress?.(progress);
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
