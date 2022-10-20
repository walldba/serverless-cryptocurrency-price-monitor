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

    if (response.status == '200') {
      console.log(
        `${CryptocurrencyService.name}: Got new crypto ${this.currency} price!`
      );
      return +Number(response.data.ticker.last).toFixed(2);
    }

    return null;
  }
}

module.exports = { CryptocurrencyService };
