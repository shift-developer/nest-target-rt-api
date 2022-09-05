import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigService } from '@database/typeorm-config.service';
import { DataSource } from 'typeorm';
import { HomeModule } from '@home/home.module';

import {
  appConfig,
  authConfig,
  databaseConfig,
  JoiValidationSchema,
} from '@config/index';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig],
      envFilePath: ['.env'],
      validationSchema: JoiValidationSchema,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmConfigService,
      dataSourceFactory: async (options) => {
        const dataSource = await new DataSource(options).initialize();
        return dataSource;
      },
    }),
    HomeModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
