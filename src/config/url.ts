import { Platform } from "react-native";
import {
  DEV_IOS_SERVER_DOMAIN,
  DEV_ANDROID_SERVER_DOMAIN,
  SERVER_DOMAIN,
  SERVER_API_PATH
} from "@env";

const devBaseUrl = Platform.OS === "ios" ? DEV_IOS_SERVER_DOMAIN : DEV_ANDROID_SERVER_DOMAIN;
const baseUrl = __DEV__ ? devBaseUrl : SERVER_DOMAIN;

const apiUrl = `${baseUrl}${SERVER_API_PATH}`;

export { baseUrl, apiUrl };
