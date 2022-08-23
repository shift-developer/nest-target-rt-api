import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().default(3000),
        DB_DATABASE_TEST: Joi.string().required(),
        DB_DATABASE: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_USERNAME: Joi.string().required(),
        JWT_SECRET: Joi.string().required(),
        TYPEORM_ATTEMPTS: Joi.string().default(10),
        TYPEORM_DELAY: Joi.string().default(3000),
        TYPEORM_SYNCHRONIZE: Joi.boolean().default(false),
      }),
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.TYPEORM_HOST,
        port: parseInt(process.env.TYPEORM_PORT),
        username: process.env.TYPEORM_USERNAME,
        password: process.env.TYPEORM_PASSWORD,
        database:
          process.env.NODE_ENV != 'test'
            ? process.env.TYPEORM_DATABASE
            : process.env.TYPEORM_DATABASE_TEST,
        entities:
          process.env.NODE_ENV != 'test'
            ? ['dist/**/*.entity{.ts,.js}']
            : ['src/**/*.entity{.ts,.js}'],
        synchronize:
          process.env.NODE_ENV == 'test' ||
          process.env.TYPEORM_SYNCHRONIZE == 'true',
        dropSchema: process.env.NODE_ENV == 'test',
        retryDelay: parseInt(process.env.TYPEORM_DELAY),
        retryAttempts: parseInt(process.env.TYPEORM_ATTEMPTS),
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
