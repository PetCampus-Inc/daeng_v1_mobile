import { launchImageLibrary } from "react-native-image-picker";
import uploadImageToS3 from "@services/s3Service";

//갤러리 실행
export const selectImage = () => {
  const options: any = {
    title: "사진 선택",
    selectionLimit: 20
  };

  let imageList: any = [];
  launchImageLibrary(options, async (response: any) => {
    if (response.didCancel) {
      console.log("사용자가 이미지 선택을 취소했습니다.");
    } else if (response.error) {
      console.log("ImagePicker 에러: ", response.error);
    } else if (response.customButton) {
      console.log("Custom button clicked :", response.customButton);
    } else {
      imageList = response.assets;
      imageList.forEach(async (item: any) => {
        await uploadImageToS3(item);
      });
    }
  });
};
