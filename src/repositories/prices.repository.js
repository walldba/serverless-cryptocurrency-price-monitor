const { randomUUID } = require('crypto');

class PricesRepository {
  constructor({ dynamoService }) {
    this.dynamoService = dynamoService;
    this.dynamoTable = process.env.DYNAMODB_PRICES_TABLE;
  }

  async insertData({ currencyName, price }) {
    const data = this.#prepareDataToInsert(currencyName, price);
    return this.dynamoService.put(data).promise();
  }

  async queryData({ currencyName }) {
    const data = this.#prepareDataToQuery(currencyName);
    const prices = await this.dynamoService.query(data).promise();

    return prices.Count ? Number(prices.Items[0].price) : 0;
  }

  #prepareDataToQuery(currencyName) {
    console.log(`${PricesRepository.name}: Preparing data to query`);

    const params = {
      ProjectionExpression: 'id, currency, price, createdAt',
      TableName: this.dynamoTable,
      KeyConditionExpression: 'currency = :currency',
      ExpressionAttributeValues: {
        ':currency': currencyName,
      },
      Limit: 1,
      ScanIndexForward: false,
    };

    return params;
  }

  #prepareDataToInsert(currencyName, price) {
    console.log(`${PricesRepository.name}: Preparing data to insert`);

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

module.exports = { PricesRepository };
