import { useState, useCallback } from "react";
import { useSetRecoilState } from "recoil";

import saveImage from "~/native/saveImage";
import { progressState } from "~/store/progress";

const useSaveImage = () => {
  const setProgress = useSetRecoilState(progressState);

  const updateProgress = useCallback(
    (current: number, total: number) => {
      Math.round((current / total) * 100);
      setProgress((prevState) => ({
        ...prevState,
        progress: Math.round((current / total) * 100)
      }));
    },

    [setProgress]
  );

  const save = useCallback(
    async (imgUrls: string | string[]) => {
      const urls = Array.isArray(imgUrls) ? imgUrls : [imgUrls];
      if (urls.length === 0) throw new Error("저장할 이미지가 없습니다.");

      setProgress({ visible: true, count: urls.length, progress: 0 });

      try {
        for (let i = 0; i < urls.length; i++) {
          const url = urls[i];
          await saveImage(url);
          updateProgress(i + 1, urls.length);
        }
      } catch (error) {
        if (error instanceof Error) throw error;

        throw new Error("이미지 저장 중 오류가 발생했습니다.");
      } finally {
        setProgress({ visible: false, count: 0, progress: 0 });
      }
    },
    [updateProgress, setProgress]
  );

  return { save };
};

export default useSaveImage;
