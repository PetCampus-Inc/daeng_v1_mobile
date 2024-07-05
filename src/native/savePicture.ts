import RNFetchBlob, { RNFetchBlobConfig } from "rn-fetch-blob";
import { PermissionsAndroid, Platform } from "react-native";
import CameraRoll from "@react-native-community/cameraroll";

async function hasAndroidPermission() {
  if (Platform.OS !== "android") return true;
  const version = Platform.Version;

  const getCheckPermissionPromise = async () => {
    if (version >= 33) {
      const [hasReadMediaImagesPermission, hasReadMediaVideoPermission] = await Promise.all([
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES),
        PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO)
      ]);
      return hasReadMediaImagesPermission && hasReadMediaVideoPermission;
    } else {
      return PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    }
  };

  const hasPermission = await getCheckPermissionPromise();
  if (hasPermission) {
    return true;
  }

  const getRequestPermissionPromise = async () => {
    if (version >= 33) {
      const statuses = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES,
        PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO
      ]);
      return (
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES] ===
          PermissionsAndroid.RESULTS.GRANTED &&
        statuses[PermissionsAndroid.PERMISSIONS.READ_MEDIA_VIDEO] ===
          PermissionsAndroid.RESULTS.GRANTED
      );
    } else {
      const status = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
      );
      return status === PermissionsAndroid.RESULTS.GRANTED;
    }
  };

  return await getRequestPermissionPromise();
}

const downloadImage = async (
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

const savePicture = async (imageUrl: string, albumName: string = "KnockDog") => {
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
      await downloadImage(imageUrl, fileName, path, true);
    } else if (Platform.OS === "ios") {
      const path = `${DocumentDir}/${fileName}`;
      const res = await downloadImage(imageUrl, fileName, path, false);
      await CameraRoll.save(res.path(), { type: "photo", album: albumName });
    }
  } catch (error) {
    console.error("Error saving picture:", error);
  }
};

export default savePicture;
