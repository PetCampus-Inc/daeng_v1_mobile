import { S3_ACCESS_KEY_ID, S3_BUCKET, S3_REGION, S3_SECRET_ACCESS_KEY } from "@env";

const awsS3config = {
  region: S3_REGION,
  bucket: S3_BUCKET,
  accessKeyID: S3_ACCESS_KEY_ID,
  secretAccessKey: S3_SECRET_ACCESS_KEY
};

export default awsS3config;
