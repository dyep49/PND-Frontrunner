const Table = require('cli-table');
const getopt = require('posix-getopt');
const { VError } = require('verror');

const bittrex = require('./lib/bittrex');
const calculateDepth = require('./lib/calculate-depth');

function parseOptions() {
  const opts = {
    marketNumber: 10,
    target: 50,
  };

  const parser = new getopt.BasicParser(':n:t:', process.argv);

  let option = parser.getopt();
  while (option !== undefined) {
    switch (option.option) {
      case 'n':
        opts.marketNumber = option.optarg;
        break;
      case 't':
        opts.target = parseFloat(option.optarg);
        break;
      default:
        throw new VError('Invalid option: -%s', option.optopt);
    }

    option = parser.getopt();
  }

  return opts;
}

function printMarkets(markets, options) {
  const table = new Table({
    head: ['Base Currency', 'Market Currency', `BTC Depth to ${options.target}% increase`],
    colWidths: [20, 20, 30],
  });

  const rows = [];
  markets.forEach((market) => {
    const amountNeeded = calculateDepth(market.orders, options.target);
    const row = [market.coinpair.baseCurrency, market.coinpair.marketCurrency, amountNeeded];
    rows.push(row);
  });

  const sortedRows = rows.sort((rowA, rowB) => rowA[2] - rowB[2]);
  sortedRows.slice(0, options.marketNumber).forEach(row => table.push(row));

  console.log(table.toString());
}

(async function main() {
  const options = parseOptions();
  console.log('Fetching data from Bittrex...');
  const markets = await bittrex.getMarkets();
  printMarkets(markets, options);
}());


process.on('unhandledRejection', r => console.log(r));
