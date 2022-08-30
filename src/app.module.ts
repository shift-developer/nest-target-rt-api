import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  appConfig,
  authConfig,
  databaseConfig,
  JoiValidationSchema,
} from '@config';
import { DatabaseModule } from '@database/database.module';
import { HomeModule } from '@home/home.module';

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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
