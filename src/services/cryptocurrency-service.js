class CryptocurrencyService {
  constructor({ cryptoBaseUrl, currency }) {
    this.cryptoBaseUrl = cryptoBaseUrl;
    this.currency = currency;
  }

  async getCryptoPrice() {
    const response = await fetch(
      `${this.cryptoBaseUrl}${this.currency}/ticker`
    );
    if (response.status == '200') return await response.json();

    return null;
  }
}

module.exports = { CryptocurrencyService };
