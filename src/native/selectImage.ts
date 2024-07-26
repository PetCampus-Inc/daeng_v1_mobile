import { PermissionsAndroid, Platform } from "react-native";
import { ImageLibraryOptions, launchImageLibrary, Asset } from "react-native-image-picker";

async function requestMediaLibraryPermission() {
  if (Platform.OS !== "android") return true;

  const permission =
    Platform.Version >= 33
      ? PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES
      : PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE;

  const granted = await PermissionsAndroid.request(permission);
  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

const defaultOptions: ImageLibraryOptions = {
  mediaType: "photo",
  selectionLimit: 20
};

export const selectImage = async (options?: ImageLibraryOptions): Promise<Asset[]> => {
  try {
    if (Platform.OS === "android" && !(await requestMediaLibraryPermission())) {
      throw new Error("Media library permission denied");
    }

    const response = await new Promise<{ assets?: Asset[] }>((resolve, reject) => {
      launchImageLibrary(options ?? defaultOptions, (res) => {
        if (res.didCancel) {
          resolve({ assets: [] });
        } else if (res.errorCode) {
          reject(new Error(res.errorMessage || "An unknown error occurred"));
        } else {
          resolve(res);
        }
      });
    });

    if (!response.assets || response.assets.length === 0) {
      throw new Error("No images selected");
    }

    return response.assets;
  } catch (error) {
    throw error;
  }
};
