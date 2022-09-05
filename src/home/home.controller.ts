import { Controller, Get } from '@nestjs/common';
import { HomeService } from '@home/home.service';

@Controller('home')
export class HomeController {
  constructor(private readonly _homeService: HomeService) {}
  @Get()
  getHealth() {
    return this._homeService.appInfo();
  }
}
