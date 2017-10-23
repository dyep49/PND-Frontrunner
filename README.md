# PND-Frontrunner

In the world of alternative cryptocurrencies, markets are easily manipulated. Markets caps are so low that an injection of as little as $5-10k into a market can cause the price of the currency to rise by 50%. As a result, many popular users in the cryptocurrency community have organized "pump and dumps" of these currencies. Typically, the organizer identifies a currency that has limited resistance (the price can be easily manipulated with relatively small amounts of money). They then purchase a significant amount of the currency and then tell their followers that they will be organizing a pump and dump to begin at, say, 3 PM. At 3 PM, the organizer tweets out the currency to be pumpted and the followers buy it up. It's not uncommon for the price to rise by 300% in seconds. As the price rises, the organizer dumps their coins onto the followers and only a small, lucky group of followers will be able to sell their currency for the inflated rate. The majority of people are left holding the bag as the price quickly crashes.

This command line tool can be used to identify currencies that have a high potential to be pump and dumped by calculating the amount of BTC needed to be injected into a market to cause the price to rise by X%. The less it takes, the more likely it is to be pumped.

## Example Usage
```
node main.js -n <Top n markets to list> -t <Target percentage>
```
