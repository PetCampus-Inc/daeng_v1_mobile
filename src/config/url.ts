import {
  DEV_SERVER_DOMAIN,
  SERVER_DOMAIN,
  SERVER_API_PATH,
  DEV_SERVER_DOMAIN_NOT_EMULATOR
} from "@env";
import { NativeModules, Platform } from "react-native";

const isIOS = Platform.OS === "ios";
const isAndroidEmulator = () => {
  return (
    (Platform.OS === "android" &&
      NativeModules.DetectEmulator &&
      NativeModules.DetectEmulator.isEmulator) ||
    false
  );
};

const androidDevUrl = isAndroidEmulator() ? DEV_SERVER_DOMAIN : DEV_SERVER_DOMAIN_NOT_EMULATOR;
const devUrl = isIOS ? DEV_SERVER_DOMAIN : androidDevUrl;
const baseUrl = __DEV__ ? devUrl : SERVER_DOMAIN;
const apiUrl = `${baseUrl}/${SERVER_API_PATH}`;

console.info(`[Base Domain] ${baseUrl}`);
console.info(`[API URL] ${apiUrl}`);

export { baseUrl, apiUrl };
