import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  appConfig,
  authConfig,
  databaseConfig,
  JoiValidationSchema,
} from '@config/index';
import { DatabaseModule } from '@database/database.module';
import { HomeModule } from '@home/home.module';
import { UsersModule } from '@users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, authConfig, databaseConfig],
      envFilePath: ['.env'],
      validationSchema: JoiValidationSchema,
    }),
    DatabaseModule,
    HomeModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
