import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  HttpServer,
  ClassSerializerInterceptor,
  ValidationPipe,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from '@users/users.module';
import {
  appConfig,
  databaseConfig,
  authConfig,
  JoiValidationSchema,
} from '@config/index';
import validationOptions from '@common/utils/validation-options';
import * as request from 'supertest';
import { TypeOrmConfigService } from '@database/typeorm-config.service';
import { DataSource } from 'typeorm';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [appConfig, databaseConfig, authConfig],
          validationSchema: JoiValidationSchema,
        }),
        TypeOrmModule.forRootAsync({
          useClass: TypeOrmConfigService,
          dataSourceFactory: async (options) => {
            const dataSource = await new DataSource(options).initialize();
            return dataSource;
          },
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();

    const reflector = app.get(Reflector);
    app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
    app.useGlobalPipes(new ValidationPipe(validationOptions));

    await app.init();
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/users (GET) endpoint', () => {
    it('should return users', async () => {
      const req = await request(httpServer).get('/users').send();
      expect(req.statusCode).toBe(200);
    });
  });
});
