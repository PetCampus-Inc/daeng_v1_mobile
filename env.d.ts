declare module "react-native-config" {
  export interface NativeConfig {
    /** 유저 에이전트 */
    WEBVIEW_USER_AGENT: string;

    /** 서버 API 경로 */
    SERVER_API_PATH: string;
    /** 서버 도메인 */
    SERVER_DOMAIN: string;
    /** 개발 서버 도메인 */
    DEV_SERVER_DOMAIN: string;
    /** 개발 서버 도메인 (비에뮬레이터) */
    DEV_SERVER_DOMAIN_NOT_EMULATOR: string;

    /** 구글 웹 클라이언트 ID */
    GOOGLE_WEB_CLIENT_ID: string;
    /** 구글 웹 클라이언트 ID (iOS) */
    GOOGLE_WEB_CLIENT_ID_IOS: string;

    /** S3 리전 */
    S3_REGION: string;
    /** S3 버킷 */
    S3_BUCKET: string;
    /** S3 액세스 키 ID */
    S3_ACCESS_KEY_ID: string;
    /** S3 비밀 액세스 키 */
    S3_SECRET_ACCESS_KEY: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
