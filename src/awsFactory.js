const AWS = require('aws-sdk');

const isLocal = process.env.IS_LOCAL;

if (isLocal) {
  AWS.config.update({
    endpoint: 'http://localhost:4566',
    credentials: { accessKeyId: 'test', secretAccessKey: 'test' },
  });
}

const DynamoDB = new AWS.DynamoDB.DocumentClient();

module.exports = {
  DynamoDBFactory: DynamoDB,
};
