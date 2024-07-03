import { Platform } from "react-native";
import { DEV_IOS_BASE_URL, DEV_ANDROID_BASE_URL, BASE_URL, API_PATH } from "@env";

const devBaseUrl = Platform.OS === "ios" ? DEV_IOS_BASE_URL : DEV_ANDROID_BASE_URL;
const baseUrl = __DEV__ ? devBaseUrl : BASE_URL;

const apiUrl = `${baseUrl}/${API_PATH}`;

console.log(Platform.OS, devBaseUrl);
export { baseUrl, apiUrl };
