import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class HomeService {
  constructor(private readonly _configService: ConfigService) {}
  appInfo() {
    return {
      name: this._configService.get<string>('app.name'),
      version: process.env.npm_package_version,
    };
  }
}
