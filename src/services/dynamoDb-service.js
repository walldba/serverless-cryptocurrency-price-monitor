const { randomUUID } = require('crypto');

class DynamoDbService {
  constructor({ dynamoService }) {
    this.dynamoService = dynamoService;
    this.dynamoTable = process.env.DYNAMODB_TABLE;
  }

  async insertItem(params) {
    return this.dynamoService.put(params).promise();
  }

  prepareData(currencyName, price) {
    const params = {
      TableName: this.dynamoTable,
      Item: {
        id: randomUUID(),
        currency: currencyName,
        price: Number(price).toFixed(2),
        createdAt: new Date().toISOString(),
      },
    };
    return params;
  }
}

module.exports = { DynamoDbService };
