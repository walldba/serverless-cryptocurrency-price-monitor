const {
  CryptocurrencyService,
} = require('../src/services/cryptocurrency-service');
const { CRYPTO_BASE_URL, CURRENCY } = require('../src/config/config');
const { sucessResponse, unsucessReturn } = require('./mocks/cryptoprice-mock');
const axios = require('axios');
jest.mock('axios');

let cryptocurrencyService;

beforeAll(() => {
  cryptocurrencyService = new CryptocurrencyService({
    cryptoBaseUrl: CRYPTO_BASE_URL,
    currency: CURRENCY,
  });
});

describe('CryptocurrencyService tests', () => {
  test('Could get cryptocurrent price', async () => {
    axios.get.mockResolvedValue(sucessResponse);
    const result = await cryptocurrencyService.getCryptoPrice();
    expect(typeof result).toBe('number');
  });

  test('Could not get cryptocurrent price', async () => {
    axios.get.mockResolvedValue(unsucessReturn);
    const result = await cryptocurrencyService.getCryptoPrice();
    expect(result).toBeNull();
  });
});
