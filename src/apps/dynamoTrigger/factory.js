const { DynamoDbService } = require('../../services/dynamoDb-service');
const { Handler } = require('../dynamoTrigger/handler');
const { DynamoDBFactory } = require('../../awsFactory');

const dynamoDbService = new DynamoDbService({ dynamoService: DynamoDBFactory });

const handler = new Handler({
  dynamoDbService,
});

module.exports = handler.dynamoTrigger.bind(handler);
