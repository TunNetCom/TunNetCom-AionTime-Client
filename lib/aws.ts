import { S3Client } from "@aws-sdk/client-s3";

export const s3Client = new S3Client({
  region: process.env.CLOUD_AWS_REGION,
  credentials: {
    accessKeyId: process.env.CLOUD_AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.CLOUD_AWS_SECRET_ACCESS_KEY!,
  },
});