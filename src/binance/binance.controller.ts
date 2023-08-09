import { Controller, Get, Param, Query } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';
import { BinanceService } from './binance.service';

@ApiTags('Binance')
@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('tradableCoins')
  async getTradableCoins(): Promise<string[]> {
    return this.binanceService.getTradableCoins();
  }

  @ApiParam({
    name: 'baseCoin',
    description:
      'Base coin whose pair prices needs to be calculated. Eg: USDT, USDC',
  })
  @ApiParam({
    name: 'calculateAveragePrices',
    description: 'Boolean value to calculate average prices',
  })
  @Get('coinPrice/:baseCoin/:calculateAveragePrices')
  async getCoinData(
    @Param('baseCoin') baseCoin: string,
    @Param('calculateAveragePrices') calculateAveragePrices: string,
  ): Promise<any> {
    const shouldCalculateAveragePrices = calculateAveragePrices === 'true';
    return this.binanceService.getCoinData(
      baseCoin,
      shouldCalculateAveragePrices,
    );
  }
}
