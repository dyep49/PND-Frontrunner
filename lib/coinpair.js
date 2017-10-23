const assert = require('assert-plus');

const coinpair = function (data) {
  assert.object(data, 'data.coinpair');
  assert.string(data.baseCurrency, 'data.coinpair.baseCurrency');
  assert.string(data.marketCurrency, 'data.coinpar.marketCurrency');

  return {
    baseCurrency: data.baseCurrency,
    marketCurrency: data.marketCurrency,
  };
};

module.exports = coinpair;
