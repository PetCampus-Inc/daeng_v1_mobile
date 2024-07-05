import { useState } from "react";
import { usePostMessage } from "~/hooks/usePostMessage";
import savePicture from "~/native/savePicture";
import { BaseNativeHookOptions } from "~/types/native";
import { PictureDownloadProgress } from "~/types/postMessage";

interface SavePictureOptions extends BaseNativeHookOptions {
  onProgress?: (progress: PictureDownloadProgress) => void;
}

const useSavePicture = ({ webviewRef, onProgress, onComplete, onError }: SavePictureOptions) => {
  const { post } = usePostMessage({ webviewRef });

  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<PictureDownloadProgress>({
    current: 0,
    remaining: 0,
    total: 0
  });

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

        await savePicture(url);
        handleProgress({ current, remaining, total });
      }

      handleComplete();
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      handleError(error);
    } finally {
      setLoading(false);
      resetProgress();
    }
  };

  const handleProgress = (progress: PictureDownloadProgress) => {
    setProgress(progress);
    post({
      type: "SAVE_PICTURE_PROGRESS",
      data: JSON.stringify(progress)
    });

    onProgress?.(progress);
  };

  const handleComplete = () => {
    post({ type: "SAVE_PICTURE_SUCCESS", data: true });
    onComplete?.();
  };

  const handleError = (error: Error) => {
    post({ type: "SAVE_PICTURE_SUCCESS", data: false });
    onError?.(error);
  };

  const resetProgress = () => {
    setProgress({ current: 0, remaining: 0, total: 0 });
  };

  return { save, loading, progress };
};

export default useSavePicture;
