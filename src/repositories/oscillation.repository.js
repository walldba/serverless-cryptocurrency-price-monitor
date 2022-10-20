const { randomUUID } = require('crypto');

class OscillationRepository {
  constructor({ dynamoService }) {
    this.dynamoService = dynamoService;
    this.dynamoTable = process.env.DYNAMODB_OSCILLATIONS_TABLE;
  }

  async insertData({ currencyName, oscillation }) {
    const data = this.#prepareDataToInsert(currencyName, oscillation);
    return this.dynamoService.put(data).promise();
  }

  #prepareDataToInsert(currencyName, oscillation) {
    console.log(`${OscillationRepository.name}: Preparing data to insert`);

    const params = {
      TableName: this.dynamoTable,
      Item: {
        id: randomUUID(),
        currency: currencyName,
        oscillation: oscillation.toString(),
        createdAt: new Date().toISOString(),
      },
    };
    return params;
  }
}

module.exports = { OscillationRepository };
