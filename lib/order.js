const assert = require('assert-plus');

const order = function (data) {
  assert.object(data, 'data.order');
  assert.number(data.quantity, 'data.order.quantity');
  assert.number(data.rate, 'data.order.rate');

  return {
    rate: data.rate,
    quantity: data.quantity,
  };
};

module.exports = order;
