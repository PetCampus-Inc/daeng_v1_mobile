import { PermissionsAndroid, Platform } from "react-native";
import { CameraOptions, launchCamera } from "react-native-image-picker";

async function requestCameraPermission() {
  if (Platform.OS !== "android") return true;

  const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);
  return granted === PermissionsAndroid.RESULTS.GRANTED;
}

const cameraOptions: CameraOptions = {
  mediaType: "photo",
  cameraType: "back",
  saveToPhotos: true,
  quality: 1,
  videoQuality: "high"
};

export const runCamera = async (): Promise<string> => {
  try {
    if (Platform.OS === "android" && !(await requestCameraPermission())) {
      throw new Error("Camera permission denied");
    }

    const response = await launchCamera(cameraOptions);

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
  } catch (error) {
    throw error;
  }
};
