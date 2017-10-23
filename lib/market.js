const assert = require('assert-plus');

const market = function (data) {
  assert.object(data, 'data.market');
  assert.object(data.coinpair, 'data.market.coinpair');
  assert.array(data.orders, 'data.market.orders');

  return {
    coinpair: data.coinpair,
    orders: data.orders,
  };
};

module.exports = market;
