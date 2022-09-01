import { Injectable } from '@nestjs/common';
import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TypeOrmConfigService implements TypeOrmOptionsFactory {
  constructor(private readonly _configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this._configService.get<string>('database.host'),
      port: this._configService.get<number>('database.port'),
      username: this._configService.get<string>('database.username'),
      password: this._configService.get<string>('database.password'),
      database: this._configService.get<string>('database.name'),
      autoLoadEntities: true,
      retryDelay: 3000,
      retryAttempts: 10,
      synchronize: this._configService.get<boolean>('database.synchronize'),
      logging: this._configService.get<boolean>('database.logging'),
      migrationsRun: this._configService.get<boolean>('database.migrate'),
      cli: {
        entitiesDir: 'src',
        migrationsDir: 'src/database/migrations',
      },
      extra: { charset: this._configService.get<string>('database.charset') },
      ssl: this._configService.get<boolean>('database.sslEnabled')
        ? {
            rejectUnauthorized: this._configService.get<boolean>(
              'database.rejectUnauthorized',
            ),
            ca: this._configService.get<string>('database.ca') ?? undefined,
            key: this._configService.get<string>('database.key') ?? undefined,
            cert: this._configService.get<string>('database.cert') ?? undefined,
          }
        : undefined,
    } as TypeOrmModuleOptions;
  }
}
