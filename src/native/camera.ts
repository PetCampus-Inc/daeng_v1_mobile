import { Alert } from "react-native";
import { CameraOptions, ImagePickerResponse, launchCamera } from "react-native-image-picker";

export const runCamera = () => {
  const options: CameraOptions = {
    mediaType: "photo",
    cameraType: "back",
    saveToPhotos: true,
    quality: 1,
    videoQuality: "high"
  };

  launchCamera(options, (response: ImagePickerResponse) => {
    if (response.didCancel) Alert.alert("촬영취소");
    else if (response.errorMessage) Alert.alert("Error : " + response.errorMessage);
    else {
      if (response.assets != null) {
        // const uri = response.assets[0].uri;
        // const souce = { uri: uri };
      }
    }
  });
};
