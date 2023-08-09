import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { BinanceService } from './binance.service';

@ApiTags('Binance')
@Controller('binance')
export class BinanceController {
  constructor(private readonly binanceService: BinanceService) {}

  @Get('tradable-coins')
  async getTradableCoins(): Promise<string[]> {
    return this.binanceService.getTradableCoins();
  }
}
