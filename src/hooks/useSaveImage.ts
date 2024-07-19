import { useState, useCallback } from "react";

import saveImage from "~/native/saveImage";

interface SaveImageState {
  loading: boolean;
  progress: number | null;
}

const useSaveImage = () => {
  const [state, setState] = useState<SaveImageState>({
    loading: false,
    progress: null
  });

  const updateProgress = useCallback((current: number, total: number) => {
    setState((prevState) => ({
      ...prevState,
      progress: Math.round((current / total) * 100)
    }));
  }, []);

  const save = useCallback(
    async (imgUrls: string | string[]): Promise<boolean> => {
      const urls = Array.isArray(imgUrls) ? imgUrls : [imgUrls];
      if (urls.length === 0) throw new Error("저장할 이미지가 없습니다.");

      setState({ loading: true, progress: 0 });

      try {
        for (let i = 0; i < urls.length; i++) {
          const url = urls[i];
          await saveImage(url);
          updateProgress(i + 1, urls.length);
        }

        return true;
      } catch (error) {
        if (error instanceof Error) throw error;

        throw new Error("이미지 저장 중 오류가 발생했습니다.");
      } finally {
        setState({ loading: false, progress: null });
      }
    },
    [updateProgress]
  );

  return { save, ...state };
};

export default useSaveImage;
