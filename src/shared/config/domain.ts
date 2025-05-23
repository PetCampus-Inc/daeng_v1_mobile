import { DEV_SERVER_DOMAIN, SERVER_DOMAIN, SERVER_API_PATH } from "@env";

const baseUrl = __DEV__ ? DEV_SERVER_DOMAIN : SERVER_DOMAIN;
const apiUrl = `${baseUrl}/${SERVER_API_PATH}`;

console.info(`[Base Domain] ${baseUrl}`);
console.info(`[API URL] ${apiUrl}`);

export { baseUrl, apiUrl };
