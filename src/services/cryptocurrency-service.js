const axios = require('axios');
class CryptocurrencyService {
  constructor({ cryptoBaseUrl, currency }) {
    this.cryptoBaseUrl = cryptoBaseUrl;
    this.currency = currency;
  }

  async getCryptoPrice() {
    const response = await axios.get(
      `${this.cryptoBaseUrl}${this.currency}/ticker`
    );

    if (response.status == '200') return response.data;

    return null;
  }
}

module.exports = { CryptocurrencyService };
