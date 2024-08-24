import { Platform } from "react-native";
import { ImageLibraryOptions, launchImageLibrary, Asset } from "react-native-image-picker";

import requestMediaLibraryPermission from "~/permission/mediaLibrary";

const defaultOptions: ImageLibraryOptions = {
  mediaType: "photo",
  selectionLimit: 20
};

export const selectImage = async (options?: ImageLibraryOptions): Promise<Asset[]> => {
  try {
    if (!(await requestMediaLibraryPermission()))
      throw new Error("Media library permission denied");

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
