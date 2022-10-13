const { Handler } = require('./handler');
const {
  CryptocurrencyService,
} = require('../../services/cryptocurrency-service');
const { DynamoDbService } = require('../../services/dynamoDb-service');
const { DynamoDBFactory } = require('../../awsFactory');
const { CRYPTO_BASE_URL, CURRENCY } = require('../../config/config');

const cryptoService = new CryptocurrencyService({
  cryptoBaseUrl: CRYPTO_BASE_URL,
  currency: CURRENCY,
});

const dynamoDbService = new DynamoDbService({ dynamoService: DynamoDBFactory });

const handler = new Handler({
  currencyName: CURRENCY,
  cryptoService,
  dynamoDbService,
});

module.exports = handler.getPrice.bind(handler);
