import { Asset, ImageLibraryOptions } from "react-native-image-picker";
import { usePostMessage } from "~/hooks/usePostMessage";
import { selectImage } from "~/native/gallery";
import uploadImageToS3 from "~/services/s3Service";
import { BaseNativeHookOptions } from "~/types/native";

interface SelectImageOptions extends BaseNativeHookOptions {
  options?: ImageLibraryOptions;
  uploadToS3?: boolean;
  onComplete?: (images: Asset[]) => void;
  onCompleteUpload?: () => void;
}

const useSelectImage = ({
  webviewRef,
  options,
  uploadToS3,
  onError,
  onComplete,
  onCompleteUpload
}: SelectImageOptions) => {
  const { post } = usePostMessage({ webviewRef });

  const select = async () => {
    try {
      const response = await selectImage(options);
      const images = response.assets;
      if (!images) return;

      if (uploadToS3) {
        await uploadImagesToS3(images);
        onCompleteUpload?.();
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

    post({ type: "SELECT_IMAGE_SUCCESS", data: imgUris });
    onComplete?.(images);
  };

  const handleError = (error: Error) => {
    post({ type: "SELECT_IMAGE_SUCCESS", data: false });
    onError?.(error);
  };

  return { select };
};

export default useSelectImage;
