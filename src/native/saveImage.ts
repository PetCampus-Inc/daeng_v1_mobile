import { CameraRoll } from "@react-native-camera-roll/camera-roll";
import { PermissionsAndroid, Platform } from "react-native";
import RNFetchBlob, { RNFetchBlobConfig } from "rn-fetch-blob";

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
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
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
      return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE).then(
        (status) => status === PermissionsAndroid.RESULTS.GRANTED
      );
    }
  };

  return await getRequestPermissionPromise();
}

const fetch = async (
  imageUrl: string,
  fileName: string,
  path: string,
  useDownloadManager: boolean
) => {
  const options: RNFetchBlobConfig = {
    fileCache: true,
    appendExt: "jpg",
    path,
    ...(useDownloadManager && {
      addAndroidDownloads: {
        useDownloadManager: true,
        notification: true,
        path,
        title: fileName,
        description: "이미지를 다운로드합니다."
      }
    })
  };

  return RNFetchBlob.config(options).fetch("GET", imageUrl);
};

const saveImage = async (imageUrl: string, albumName: string = "KnockDog") => {
  if (Platform.OS === "android" && !(await hasAndroidPermission())) {
    return;
  }

  const PictureDir = RNFetchBlob.fs.dirs.PictureDir;
  const DocumentDir = RNFetchBlob.fs.dirs.DocumentDir;

  try {
    const date = new Date();
    const fileName = `${albumName}_${date.getTime()}.jpg`;

    if (Platform.OS === "android") {
      const path = `${PictureDir}/${fileName}`;
      await fetch(imageUrl, fileName, path, true);
    } else if (Platform.OS === "ios") {
      const path = `${DocumentDir}/${fileName}`;
      const res = await fetch(imageUrl, fileName, path, false);
      await CameraRoll.save(res.path(), { type: "photo", album: albumName });
    }
  } catch (error) {
    console.error("Error saving picture:", error);
  }
};

export default saveImage;
