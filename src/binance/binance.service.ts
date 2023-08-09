import { Injectable } from '@nestjs/common';
import * as ccxt from 'ccxt';

@Injectable()
export class BinanceService {
  async getTradableCoins(): Promise<string[]> {
    try {
      const exchange = new ccxt.binance();
      const markets = await exchange.loadMarkets();

      const tradableCoins = Object.keys(markets);

      return tradableCoins;
    } catch (error) {
      console.error(
        'Error fetching tradable coins from Binance:',
        error.message,
      );
      throw new Error('Failed to fetch tradable coins.');
    }
  }

  async getSortedCoinPairs(baseCoin: string): Promise<string[]> {
    try {
      const exchange = new ccxt.binance();
      const markets = await exchange.loadMarkets();

      const sortedCoinPairs = Object.keys(markets)
        .filter((symbol) => {
          const [base, quote] = symbol.split('/');
          return quote === baseCoin;
        })
        .sort();

      console.log(sortedCoinPairs);

      return sortedCoinPairs;
    } catch (error) {
      console.error(
        'Error fetching sorted coin pairs from Binance:',
        error.message,
      );
      throw new Error('Failed to fetch sorted coin pairs.');
    }
  }

  async getCoinPairAveragePrice(pair: string): Promise<number> {
    try {
      const exchange = new ccxt.binance();
      const recentTrades = await exchange.fetchTrades(pair, undefined, 100);
      const lastHundredPrices = recentTrades.map((trade) => trade.price);

      if (lastHundredPrices.length > 0) {
        const averagePrice =
          lastHundredPrices.reduce((sum, price) => sum + price, 0) /
          lastHundredPrices.length;
        console.log(averagePrice);
        return averagePrice;
      } else {
        return 0; // No recent trades found
      }
    } catch (error) {
      console.error(
        'Error fetching recent trades for coin pair:',
        pair,
        error.message,
      );
      throw new Error('Failed to fetch recent trades for coin pair.');
    }
  }

  async getCoinData(
    baseCoin: string,
    calculateAveragePrices: boolean,
  ): Promise<any> {
    try {
      const sortedCoinPairs = await this.getSortedCoinPairs(baseCoin);
      const response: any = { sortedCoinPairs, averagePrices: {} };

      if (calculateAveragePrices) {
        const averagePricePromises: Promise<void>[] = sortedCoinPairs.map(
          async (coinPair) => {
            const averagePrice = await this.getCoinPairAveragePrice(coinPair);
            response.averagePrices[coinPair] = averagePrice;
          },
        );

        await Promise.all(averagePricePromises);
      }

      return response;
    } catch (error) {
      console.error('Error fetching coin data:', error.message);
      throw new Error('Failed to fetch coin data.');
    }
  }
}
