import Config from "react-native-config";

const baseUrl = Config.DEV_SERVER_DOMAIN;
const apiUrl = `${baseUrl}/${Config.SERVER_API_PATH}`;

console.info(`[Base Domain] ${baseUrl}`);
console.info(`[API URL] ${apiUrl}`);

export { baseUrl, apiUrl };
