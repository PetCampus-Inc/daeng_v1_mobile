import { useState } from "react";
import savePicture from "~/native/savePicture";

interface ProgressState {
  current: number;
  remaining: number;
  total: number;
}

interface SavePictureOptions {
  onProgress?: (progress: ProgressState) => void;
  onError?: (error: Error) => void;
}

const useSavePicture = ({ onProgress, onError }: SavePictureOptions = {}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [progress, setProgress] = useState<ProgressState>({ current: 0, remaining: 0, total: 0 });

  const save = (imgUrls: string | string[]) => {
    const urls = Array.isArray(imgUrls) ? imgUrls : [imgUrls];
    if (urls.length === 0) return;

    setLoading(true);

    const total = urls.length;
    for (let i = 0; i < urls.length; i++) {
      const current = i + 1;
      const remaining = total - current;
      const url = urls[i];

      savePicture(url)
        .then(() => {
          onProgress?.({ current, remaining, total });
          setProgress({ current, remaining, total });
        })
        .catch(onError)
        .finally(() => {
          setLoading(false);
          setProgress({ current: 0, remaining: 0, total: 0 });
        });
    }
  };

  return { save, loading, progress };
};

export default useSavePicture;
