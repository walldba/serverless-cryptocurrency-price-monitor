const sucessResponse = {
  status: 200,
  statusText: 'OK',
  data: {
    ticker: {
      high: '103241.00000000',
      low: '101500.00000000',
      vol: '57.84238284',
      last: '103100.05035000',
      buy: '103100.05035001',
      sell: '103199.99',
      open: '102092.74190000',
      date: 1666709437,
    },
  },
};

const unsucessReturn = {
  status: 400,
};

module.exports = { sucessResponse, unsucessReturn };
