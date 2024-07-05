import RNFS from "react-native-fs";
import AWS from "aws-sdk";
import { awsS3config } from "~/config/s3";

const s3 = new AWS.S3({
  accessKeyId: awsS3config.accessKeyID,
  secretAccessKey: awsS3config.secretAccessKey,
  region: awsS3config.region
});

//s3 upload function
const uploadImageToS3 = async (imgConfig: any) => {
  return new Promise(async (resolve, reject) => {
    const fileData = await RNFS.readFile(imgConfig.uri, "base64");

    const params = {
      Bucket: awsS3config.bucket,
      Key: imgConfig.fileName, // File name you want to save as in S3
      Body: Buffer.from(fileData, "base64"),
      ACL: "public-read",
      ContentType: imgConfig.type
    };

    // Uploading files to the bucket
    s3.upload(params, function (err: any, data: any) {
      if (err) {
        reject(err);
      } else {
        console.log(`File uploaded successfully. ${data.Location}`);
        resolve(data.Location);
      }
    });
    console.log("end");
  });
};

export default uploadImageToS3;
