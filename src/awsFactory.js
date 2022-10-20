const AWS = require('aws-sdk');

const isLocal = process.env.IS_LOCAL;

const DynamoDB = new AWS.DynamoDB.DocumentClient({
  endpoint: isLocal ? 'http://localhost:4566' : undefined,
});

const SES = new AWS.SES();

module.exports = {
  SESFactory: SES,
  DynamoDBFactory: DynamoDB,
};
