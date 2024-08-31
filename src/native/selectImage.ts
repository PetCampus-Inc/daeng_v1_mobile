import { ImageLibraryOptions, launchImageLibrary, Asset } from "react-native-image-picker";

import requestMediaLibraryPermission from "~/permission/mediaLibrary";

export const selectImage = async (options: Partial<ImageLibraryOptions>): Promise<Asset[]> => {
  try {
    if (!(await requestMediaLibraryPermission()))
      throw new Error("Media library permission denied");

    const defaultOptions: ImageLibraryOptions = {
      mediaType: options?.mediaType ?? "photo",
      selectionLimit: options?.selectionLimit ?? 20,
      ...options
    };

    const response = await new Promise<{ assets?: Asset[] }>((resolve, reject) => {
      launchImageLibrary(defaultOptions, (res) => {
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
