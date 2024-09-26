import { PermissionsAndroid, Platform } from "react-native";
import { ImageLibraryOptions, launchImageLibrary } from "react-native-image-picker";

import { mergeObject } from "@_shared/utils/merge-object";

const defaultOptions: ImageLibraryOptions = {
  mediaType: "photo",
  selectionLimit: 20
};

/**
 * 이미지 선택 함수
 * @param options 이미지 선택 옵션
 * @returns 선택된 이미지 URI 배열
 */
export const selectImage = async (options?: ImageLibraryOptions): Promise<string[]> => {
  if (!(await requestMediaLibraryPermission())) throw new Error("사진 접근 권한이 없습니다.");

  const mergedOptions = mergeObject(defaultOptions, options);

  const response = await launchImageLibrary(mergedOptions);

  if (response.errorCode) throw new Error(response.errorMessage);
  else {
    const uris = response.assets
      ?.map((asset) => asset.uri)
      .filter((uri): uri is string => uri !== undefined);

    return uris ?? [];
  }
};

const requestMediaLibraryPermission = async () => {
  if (Platform.OS !== "android") return true;

  const permission =
    Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const granted = await PermissionsAndroid.request(permission);
  return granted === PermissionsAndroid.RESULTS.GRANTED;
};
