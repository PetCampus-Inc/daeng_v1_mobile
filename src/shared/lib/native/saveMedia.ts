import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";

/**
 * 이미지 및 동영상 저장 함수
 * @param mediaUrl 미디어 URL
 * @param albumName 앨범 이름 (기본값: "똑독", 갤럭시만 사용)
 * @param mediaName 미디어 이름 접두어 (기본값: "knockdog")
 */
export const saveMedia = async (
  mediaUrl: string,
  albumName: string = "똑독",
  mediaName: string = "knockdog"
) => {
  if (Platform.OS === "android" && !(await hasAndroidPermission()))
    throw new Error("Permission denied");

  let directory: string;
  if (Platform.OS === "android") {
    directory = `${RNFS.ExternalDirectoryPath}/Pictures/${albumName}`;
  } else {
    directory = `${RNFS.DocumentDirectoryPath}/${albumName}`;
  }

  await RNFS.mkdir(directory);

  const date = new Date();
  const extension = getFileExtension(mediaUrl);
  if (!extension) throw new Error("지원하지 않는 파일 형식입니다.");

  const fileName = `${mediaName}_${date.getTime()}.${extension}`;
  const filePath = `${directory}/${fileName}`;

  await fetch(mediaUrl, filePath);

  if (Platform.OS === "ios") {
    await CameraRoll.saveAsset(filePath, { type: "auto", album: mediaName });
    await RNFS.unlink(filePath);
  } else if (Platform.OS === "android") {
    await RNFS.scanFile(filePath);
  }
};

const getFileExtension = (url: string): string | null => {
  const fileName = url.split("/").pop() || "";
  const match = fileName.match(/\.([^.]+)$/);
  const validExtensions = ["jpg", "jpeg", "png", "gif", "mp4", "mov"];
  const extension = match ? match[1].toLowerCase() : "";
  return validExtensions.includes(extension) ? extension : null;
};

const fetch = async (mediaUrl: string, filePath: string) => {
  return RNFS.downloadFile({
    fromUrl: mediaUrl,
    toFile: filePath
  }).promise;
};

const hasAndroidPermission = async () => {
  const getCheckPermissionPromise = () => {
    if (Platform.OS !== "android") return true;
    if (Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO)
      ]).then(
        ([hasReadMediaMediasPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaMediasPermission && hasReadMediaVideoPermission
      );
    } else {
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }
  const getRequestPermissionPromise = () => {
    if (Platform.OS !== "android") return true;
    if (Platform.Version >= 33) {
      return PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
      ]).then(
        (statuses) =>
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
            PermissionsAndroid.RESULTS.GRANTED &&
          statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
            PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );
    }
  };

  return await getRequestPermissionPromise();
};
