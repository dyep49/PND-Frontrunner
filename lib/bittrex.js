const Promise = require('bluebird');
const request = require('request-promise');

const Coinpair = require('./coinpair');
const Order = require('./order');
const Market = require('./market');

const API_BASE = 'https://bittrex.com/api/v1.1/public';

function buildOrder(orderData) {
  const data = {
    rate: orderData.Rate,
    quantity: orderData.Quantity,
  };

  return Order(data);
}

function buildCoinpair(market) {
  const data = {
    baseCurrency: market.BaseCurrency,
    marketCurrency: market.MarketCurrency,
  };

  return Coinpair(data);
}

function buildOrdersUrl(coinpair) {
  return `${API_BASE}/getorderbook?market=${coinpair.baseCurrency}-${coinpair.marketCurrency}&type=sell`;
}

async function getOrders(coinpair) {
  return new Promise((async (resolve) => {
    const coinpairUrl = buildOrdersUrl(coinpair);
    const ordersResponse = await request(coinpairUrl);
    const parsedResponse = JSON.parse(ordersResponse).result;

    if (parsedResponse) {
      const orders = parsedResponse.map(buildOrder);
      resolve(orders);
    } else {
      resolve([]);
    }
  }));
}

function coinpairToMarket(coinpair) {
  return new Promise((async (resolve) => {
    const orders = await getOrders(coinpair);
    const markets = Market({ coinpair, orders });
    resolve(markets);
  }));
}

function filterCurrency(response, currency) {
  return response.filter(market => market.BaseCurrency === currency);
}

async function getMarkets() {
  const marketsResponse = await request(`${API_BASE}/getmarkets`);
  const parsedResponse = JSON.parse(marketsResponse).result;

  const coinpairs = filterCurrency(parsedResponse, 'BTC').map(buildCoinpair);
  return new Promise(((resolve) => {
    const markets = coinpairs.map(coinpairToMarket);
    resolve(Promise.all(markets));
  }));
}

module.exports = { getMarkets };

