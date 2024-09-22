import { CameraOptions, launchCamera } from "react-native-image-picker";

import { mergeObject } from "@_shared/utils/merge-object";

const defaultOptions: CameraOptions = {
  mediaType: "photo",
  cameraType: "back",
  saveToPhotos: true,
  quality: 1,
  videoQuality: "high"
};

/**
 * 카메라 실행 함수
 * @param options 카메라 옵션
 * @returns 캡처된 이미지 URI
 */
export const runCamera = async (options?: CameraOptions): Promise<string> => {
  const mergedOptions = mergeObject(defaultOptions, options);

  const response = await launchCamera(mergedOptions);

  if (response.errorCode) throw new Error(response.errorMessage);
  else {
    if (!response.assets) throw new Error("이미지 소스를 가져오는 중 오류가 발생했습니다.");
    const [asset] = response.assets;
    if (!asset.uri) throw new Error("이미지 소스를 가져오는 중 오류가 발생했습니다.");
    return asset.uri;
  }
};
