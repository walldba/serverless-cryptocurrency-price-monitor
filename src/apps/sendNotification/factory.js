const { SESFactory } = require('../../awsFactory');
const { SES_EMAIL_FROM, SES_EMAIL_TO } = require('../../config/config');
const { Handler } = require('../sendNotification/handler');

const handler = new Handler({
  emailService: SESFactory,
  to: SES_EMAIL_TO,
  from: SES_EMAIL_FROM,
});

module.exports = handler.sendNotification.bind(handler);
