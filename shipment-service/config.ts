require('dotenv').config();
export const config = {
  TEST_QUEUE_URL: process.env.SQS_URL,
  AWS_REGION: 'us-east-1',
  ACCESS_KEY_ID: process.env.AWS_ACCESS_KEY_ID,
  SECRET_ACCESS_KEY: process.env.AWS_SECRET_ACCESS_KEY,
  SNS_ARN: process.env.SNS_ARN,
  MONGO_URL: process.env.MONGO_URL,
};
