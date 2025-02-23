import Config from "react-native-config";

const awsS3config = {
  region: Config.S3_REGION,
  bucket: Config.S3_BUCKET,
  accessKeyID: Config.S3_ACCESS_KEY_ID,
  secretAccessKey: Config.S3_SECRET_ACCESS_KEY
};

export default awsS3config;
