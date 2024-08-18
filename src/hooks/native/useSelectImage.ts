import { Asset, ImageLibraryOptions } from "react-native-image-picker";

import { selectImage } from "~/native/selectImage";
// import uploadImageToS3 from "~/services/s3Service";

interface SelectImageOptions {
  options?: ImageLibraryOptions;
  uploadToS3?: boolean;
}

const useSelectImage = ({ options, uploadToS3 }: SelectImageOptions = {}) => {
  // const uploadImagesToS3 = async (assets: Asset[]): Promise<void> => {
  //   await Promise.all(assets.map(uploadImageToS3));
  // };

  const select = async (): Promise<string[]> => {
    try {
      const response: Asset[] = await selectImage(options);
      const assets = response ?? [];
      const uris = assets
        .map((image) => image.uri)
        .filter((uri): uri is string => uri !== undefined);
      // if (uploadToS3) await uploadImagesToS3(assets);

      return uris;
    } catch (error) {
      if (error instanceof Error) throw error;
      throw new Error("이미지 선택 중 오류가 발생했습니다.");
    }
  };

  return { select };
};

export default useSelectImage;
