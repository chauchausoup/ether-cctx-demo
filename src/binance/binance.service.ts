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
}
