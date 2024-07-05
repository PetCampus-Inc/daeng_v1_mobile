import { ImageLibraryOptions, launchImageLibrary, Asset } from "react-native-image-picker";

const defaultOptions: ImageLibraryOptions = {
  mediaType: "photo",
  selectionLimit: 20
};

export const selectImage = (options?: ImageLibraryOptions) => {
  return new Promise<{ assets?: Asset[] }>((resolve, reject) => {
    launchImageLibrary(options ?? defaultOptions, (response) => {
      if (response.didCancel) {
        console.log("사용자가 이미지 선택을 취소했습니다.");
        resolve({});
      } else if (response.errorCode) {
        console.error("ImagePicker 에러: ", response.errorMessage);
        reject(response.errorMessage);
      } else {
        resolve(response);
      }
    });
  });
};
