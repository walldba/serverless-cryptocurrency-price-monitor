'use strict';

const config = require('../config/config');
const { CryptocurrencyService } = require('../services/cryptocurrency-service');
const { S3 } = require('./awsFactory');

class Handler {
  constructor({ cryptoService }) {
    this.cryptoService = cryptoService;
  }

  async getPrice(event) {
    try {
      console.log('Starting price monitoring...');
      const cryptoPrice = await cryptoService.getCryptoPrice();

      if (!cryptoPrice) throw new Error('Failed on get price from crypto API');

      console.log(cryptoPrice);
    } catch (error) {
      console.log('Failed on execute price monitoring...');
    }
  }
}

const { CRYPTO_BASE_URL, CURRENCY } = config;

const cryptoService = new CryptocurrencyService({
  cryptoBaseUrl: CRYPTO_BASE_URL,
  currency: CURRENCY,
});
const handler = new Handler({ cryptoService });

module.exports = handler.getPrice.bind(handler);
