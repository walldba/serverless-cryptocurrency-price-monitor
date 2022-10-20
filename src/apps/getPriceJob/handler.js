'use strict';

class Handler {
  constructor({
    currencyName,
    percentageValue,
    cryptoService,
    pricesRepository,
    oscillationRepository,
  }) {
    this.currencyName = currencyName;
    this.percentageValue = percentageValue;
    this.cryptoService = cryptoService;
    this.pricesRepository = pricesRepository;
    this.oscillationRepository = oscillationRepository;
  }

  async getPrice(event) {
    try {
      console.log('Starting price monitoring...');
      const newPrice = await this.cryptoService.getCryptoPrice();

      if (!newPrice) throw new Error('Failed on get price from crypto API');

      const oldPrice = await this.pricesRepository.queryData({
        currencyName: this.currencyName,
      });
      console.log(`Got old crypto ${this.currencyName} price!`);

      await this.pricesRepository.insertData({
        currencyName: this.currencyName,
        price: newPrice,
      });

      if (oldPrice) {
        const { hadOscillation, oscillation } = this.#checkOscillationValue({
          percentageValue: this.percentageValue,
          oldPrice,
          newPrice,
        });

        if (hadOscillation) {
          console.log(`Inserting ${this.currencyName} oscillation!`);

          await this.oscillationRepository.insertData({
            currencyName: this.currencyName,
            oscillation,
          });
        }
      }
      console.log('Data was inserted');
    } catch (error) {
      console.log('Failed on execute price monitoring...', error);
      throw error;
    }
  }

  #checkOscillationValue({ percentageValue, oldPrice, newPrice }) {
    const percentage = percentageValue / 100;
    const oscillation = Math.abs(oldPrice - newPrice);
    const hadOscillation = oscillation > oldPrice * percentage;

    return {
      hadOscillation,
      percentage,
      oscillation,
    };
  }
}

module.exports = { Handler };
