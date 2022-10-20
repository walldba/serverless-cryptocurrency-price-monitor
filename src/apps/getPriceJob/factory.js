const { Handler } = require('./handler');
const {
  CryptocurrencyService,
} = require('../../services/cryptocurrency-service');
const { DynamoDBFactory } = require('../../awsFactory');
const {
  CRYPTO_BASE_URL,
  CURRENCY,
  PERCENTAGE_VALUE,
} = require('../../config/config');
const { PricesRepository } = require('../../repositories/prices.repository');
const {
  OscillationRepository,
} = require('../../repositories/oscillation.repository');

const cryptoService = new CryptocurrencyService({
  cryptoBaseUrl: CRYPTO_BASE_URL,
  currency: CURRENCY,
});

const pricesRepository = new PricesRepository({
  dynamoService: DynamoDBFactory,
});

const oscillationRepository = new OscillationRepository({
  dynamoService: DynamoDBFactory,
});

const handler = new Handler({
  percentageValue: PERCENTAGE_VALUE,
  currencyName: CURRENCY,
  cryptoService,
  pricesRepository,
  oscillationRepository,
});

module.exports = handler.getPrice.bind(handler);
