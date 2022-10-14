const { randomUUID } = require('crypto');

class DynamoDbService {
  constructor({ dynamoService }) {
    this.dynamoService = dynamoService;
    this.dynamoTable = process.env.DYNAMODB_TABLE;
  }

  async insertData(params) {
    return this.dynamoService.put(params).promise();
  }

  async queryData(params) {
    return this.dynamoService.query(params).promise();
  }

  prepareDataToQuery(currencyName) {
    const params = {
      ProjectionExpression: 'id, currency, price, createdAt',
      TableName: this.dynamoTable,
      KeyConditionExpression: 'currency = :currency',
      ExpressionAttributeValues: {
        ':currency': currencyName['S'],
      },
      Limit: 1,
      ScanIndexForward: false,
    };

    return params;
  }

  prepareDataToInsert(currencyName, price) {
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
