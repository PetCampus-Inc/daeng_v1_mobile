import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import * as base64 from "base64-js";
import RNFS from "react-native-fs";
import { v4 as uuidv4 } from "uuid";

import awsS3config from "~/config/s3";
import { compressImage } from "~/utils/compressImage";

const client = new S3Client({
  region: awsS3config.region,
  credentials: {
    accessKeyId: awsS3config.accessKeyID,
    secretAccessKey: awsS3config.secretAccessKey
  }
});

export interface S3UploadParams {
  key: string;
  imageUri: string;
  maxSize?: number;
}

const S3Upload = async ({ key, imageUri, maxSize }: S3UploadParams) => {
  try {
    const compressedImageUri = await compressImage(imageUri, maxSize);
    const imageData = await RNFS.readFile(compressedImageUri, "base64");
    const binaryImageData = base64.toByteArray(imageData);

    const extension = compressedImageUri.split(".").pop()?.toLowerCase() || "jpg";
    const fileName = `${uuidv4().replace(/-/g, "")}.${extension}`;

    await client.send(
      new PutObjectCommand({
        Bucket: awsS3config.bucket,
        Key: `${key}/${fileName}`,
        Body: binaryImageData
      })
    );

    const url = `https://${awsS3config.bucket}.s3.amazonaws.com/${key}/${fileName}`;
    return url;
  } catch (error) {
    console.error("[S3Upload]", error);
    throw error;
  }
};

export default S3Upload;
