module.exports = {
  CRYPTO_BASE_URL:
    process.env.CRYPTO_BASE_URL || 'https://www.mercadobitcoin.net/api/',
  CURRENCY: process.env.CURRENCY || 'BTC',
  PERCENTAGE_VALUE: +process.env.PERCENTAGE_VALUE || 0.01,
  SES_EMAIL_TO: process.env.SES_EMAIL_TO,
  SES_EMAIL_FROM: process.env.SES_EMAIL_FROM,
};
