'use strict';

class Handler {
  constructor({ emailService, from, to }) {
    this.emailService = emailService;
    this.from = from;
    this.to = to;
  }

  async sendNotification(event) {
    console.log('Receive new oscillation event');
    const insertedData = event.Records[0].dynamodb['Keys'];
    const oscillation = Number(insertedData.oscillation['S']).toFixed(2);
    const currency = insertedData.currency['S'];

    const subject = `New oscillation on ${currency} price`;
    const body = `New oscillation on ${currency} price \n It's a good time to buy, there was a ${oscillation} oscillation in the price of ${currency}!!`;

    await this.emailService
      .sendEmail({
        Source: this.from,
        Destination: { ToAddresses: [this.to] },
        Message: {
          Subject: { Data: subject },
          Body: { Text: { Data: body } },
        },
      })
      .promise();

    console.log('Notification sended');
  }
}

module.exports = { Handler };
