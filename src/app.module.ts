import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EtherController } from './ether/ether.controller';
import { EtherService } from './ether/ether.service';
import { BinanceController } from './binance/binance.controller';
import { BinanceService } from './binance/binance.service';

@Module({
  imports: [],
  controllers: [AppController, EtherController, BinanceController],
  providers: [AppService, EtherService, BinanceService],
})
export class AppModule {}
