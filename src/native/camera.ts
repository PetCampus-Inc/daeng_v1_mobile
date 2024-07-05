import { Alert } from "react-native";
import { CameraOptions, ImagePickerResponse, launchCamera } from "react-native-image-picker";

//카메라 앱을 실행하는 함수
export const runCamera = () => {
  const options: CameraOptions = {
    mediaType: "photo",
    cameraType: "back",
    saveToPhotos: true,
    quality: 1,
    videoQuality: "high"
  };

  //2. 촬영 결과를 받아오는 callback 메소드 등록
  launchCamera(options, (response: ImagePickerResponse) => {
    if (response.didCancel) Alert.alert("촬영취소");
    else if (response.errorMessage) Alert.alert("Error : " + response.errorMessage);
    else {
      if (response.assets != null) {
        const uri = response.assets[0].uri;
        const souce = { uri: uri };
      }
    }
  }); //파라미터로 응답객체 받음
};
