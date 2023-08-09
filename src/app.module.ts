import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EtherController } from './ether/ether.controller';
import { EtherService } from './ether/ether.service';

@Module({
  imports: [],
  controllers: [AppController, EtherController],
  providers: [AppService, EtherService],
})
export class AppModule {}
