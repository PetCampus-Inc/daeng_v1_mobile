import { selectImage } from "@utils/index";

const nativeHandler = {
  GALLERY: () => selectImage()
};

export const useNative = () => {};
