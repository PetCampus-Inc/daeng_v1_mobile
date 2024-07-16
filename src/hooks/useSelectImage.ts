import { RefObject } from "react";
import { Asset, ImageLibraryOptions } from "react-native-image-picker";

import { WebViewElement } from "~/components/WebView";
import { usePostMessage } from "~/hooks/usePostMessage";
import { selectImage } from "~/native/selectImage";
import uploadImageToS3 from "~/services/s3Service";

interface SelectImageOptions {
  webviewRef: RefObject<WebViewElement>;
  options?: ImageLibraryOptions;
  uploadToS3?: boolean;
  onSuccess?: (images: Asset[]) => void;
  onError?: (error: Error) => void;
  onUpload?: () => void;
}

const useSelectImage = ({
  webviewRef,
  options,
  uploadToS3,
  onSuccess,
  onUpload,
  onError
}: SelectImageOptions) => {
  const { post } = usePostMessage({ webviewRef });

  const select = async () => {
    try {
      const response = await selectImage(options);
      const images = response.assets;
      if (!images) return;

      if (uploadToS3) {
        await uploadImagesToS3(images);
        onUpload?.();
      }

      handleComplete(images);
    } catch (e) {
      const error = e instanceof Error ? e : new Error(String(e));
      handleError(error);
    }
  };

  const uploadImagesToS3 = async (images: Asset[]) => {
    for (const item of images) {
      await uploadImageToS3(item);
    }
  };

  const handleComplete = (images: Asset[]) => {
    const imgUris = images
      .map((image) => image.uri)
      .filter((uri): uri is string => uri !== undefined);

    if (imgUris.length === 0) return;

    post("SELECT_IMAGE_SUCCESS", imgUris);
    onSuccess?.(images);
  };

  const handleError = (error: Error) => {
    post("SELECT_IMAGE_SUCCESS", false);
    onError?.(error);
  };

  return { select };
};

export default useSelectImage;
