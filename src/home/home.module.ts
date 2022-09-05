import { Module } from '@nestjs/common';
import { HomeService } from '@home/home.service';
import { HomeController } from '@home/home.controller';

@Module({
  providers: [HomeService],
  controllers: [HomeController],
})
export class HomeModule {}
