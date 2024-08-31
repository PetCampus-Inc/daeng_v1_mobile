import ImageResizer, { ResizeFormat } from "@bam.tech/react-native-image-resizer";
import RNFS from "react-native-fs";

const DEFAULT_MAX_SIZE = 5 * 1024 * 1024; // 5MB

/**
 * 이미지를 압축하는 함수
 * @param imageUri 압축할 이미지의 URI
 * @param maxSize 압축할 이미지의 최대 크기
 * @returns 압축된 이미지의 URI
 */
export const compressImage = async (
  imageUri: string,
  maxSize: number = DEFAULT_MAX_SIZE
): Promise<string> => {
  const originalFormat = getResizeFormat(imageUri);

  let quality = 90;
  let compressedUri = imageUri;

  while (true) {
    const fileStats = await RNFS.stat(compressedUri);
    if (fileStats.size <= maxSize) {
      return compressedUri;
    }

    try {
      const result = await ImageResizer.createResizedImage(
        compressedUri,
        2048,
        2048,
        originalFormat,
        quality,
        0,
        undefined,
        false,
        { mode: "contain", onlyScaleDown: true }
      );
      compressedUri = result.uri;
    } catch (error) {
      console.error("[Compress Image]", error);
      return imageUri;
    }

    quality -= 10;
    if (quality < 10) {
      console.warn("[Compress Image] 이미지 압축 실패");
      return compressedUri;
    }
  }
};

export const getResizeFormat = (uri: string): ResizeFormat => {
  const extension = uri.split(".").pop()?.toLowerCase();
  switch (extension) {
    case "png":
      return "PNG";
    case "webp":
      return "WEBP";
    case "jpg":
    case "jpeg":
    default:
      return "JPEG";
  }
};
