import { CameraOptions, launchCamera } from "react-native-image-picker";

export const runCamera = async (): Promise<string> => {
  const options: CameraOptions = {
    mediaType: "photo",
    cameraType: "back",
    saveToPhotos: true,
    quality: 1,
    videoQuality: "high"
  };

  const response = await launchCamera(options);

  if (response.didCancel) {
    throw new Error("User cancelled image picker");
  }

  if (response.errorCode || response.errorMessage) {
    throw new Error(response.errorMessage || "An unknown error occurred");
  }

  const asset = response.assets?.[0];

  if (!asset || !asset.uri) {
    throw new Error("Failed to get image asset or uri");
  }

  return asset.uri;
};
