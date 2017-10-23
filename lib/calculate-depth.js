const assert = require('assert-plus');

const calculateDepth = function (orders, percentIncrease) {
  assert.arrayOfObject(orders, 'calculate.orders');
  assert.number(percentIncrease, 'calculate.percentIncrease');

  let targetHit = false;
  let amountNeeded = 0;
  const currentOrder = orders[0];

  if (currentOrder) {
    const targetIncrease = currentOrder.rate * percentIncrease / 100;
    const targetPrice = currentOrder.rate + targetIncrease;

    for (let i = 0; i < orders.length; i += 1) {
      if (orders[i].rate < targetPrice) {
        const total = orders[i].rate * orders[i].quantity;
        amountNeeded += total;
      } else {
        targetHit = true;
        break;
      }
    }
  }

  return targetHit ? amountNeeded : Infinity;
};

module.exports = calculateDepth;
