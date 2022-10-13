'use strict';

class Handler {
  constructor({ currencyName, cryptoService, dynamoDbService }) {
    this.currencyName = currencyName;
    this.cryptoService = cryptoService;
    this.dynamoDbService = dynamoDbService;
  }

  async getPrice(event) {
    try {
      console.log('Starting price monitoring...');
      const cryptoPrice = await this.cryptoService.getCryptoPrice();

      if (!cryptoPrice) throw new Error('Failed on get price from crypto API');

      console.log(`Got crypto ${this.currencyName} price!`);

      console.log('Preparing data to insert');
      const data = this.dynamoDbService.prepareData(
        this.currencyName,
        cryptoPrice.ticker.last
      );

      await this.dynamoDbService.insertItem(data);
      console.log('Data was inserted', data);
    } catch (error) {
      console.log('Failed on execute price monitoring...', error);
    }
  }
}

module.exports = { Handler };
