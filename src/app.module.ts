import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EtherController } from './ether/ether.controller';

@Module({
  imports: [],
  controllers: [AppController, EtherController],
  providers: [AppService],
})
export class AppModule {}
