import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { PermissionsAndroid, Platform } from "react-native";
import RNFS from "react-native-fs";

async function hasAndroidPermission() {
  const getCheckPermissionPromise = () => {
    if (Platform.OS !== "android") return true;
    if (Platform.Version >= 33) {
      return Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO)
      ]).then(
        ([hasReadMediaImagesPermission, hasReadMediaVideoPermission]) =>
          hasReadMediaImagesPermission && hasReadMediaVideoPermission
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
}

const fetch = async (imageUrl: string, filePath: string) => {
  return RNFS.downloadFile({
    fromUrl: imageUrl,
    toFile: filePath
  }).promise;
};

const saveImage = async (
  imageUrl: string,
  albumName: string = "똑독",
  imageName: string = "knockdog"
) => {
  try {
    if (Platform.OS === "android" && !(await hasAndroidPermission())) {
      // TODO: 에러 말고, 권한 재요청으로 바꾸기
      throw new Error("Permission denied");
    }
    let directory: string;
    if (Platform.OS === "android") {
      directory = `${RNFS.ExternalDirectoryPath}/Pictures/${albumName}`;
    } else {
      directory = `${RNFS.DocumentDirectoryPath}/${albumName}`;
    }

    await RNFS.mkdir(directory);

    const date = new Date();
    const fileName = `${imageName}_${date.getTime()}.png`;
    const filePath = `${directory}/${fileName}`;

    await fetch(imageUrl, filePath);

    if (Platform.OS === "ios") {
      await CameraRoll.saveAsset(filePath, { type: "photo", album: imageName });
      await RNFS.unlink(filePath);
    } else if (Platform.OS === "android") {
      await RNFS.scanFile(filePath);
    }
  } catch (error) {
    throw error;
  }
};

export default saveImage;
