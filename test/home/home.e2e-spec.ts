import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, HttpServer } from '@nestjs/common';
import { HomeModule } from '@home/home.module';
import { ConfigModule } from '@nestjs/config';
import { appConfig, JoiValidationSchema } from '@config/index';
import * as request from 'supertest';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let httpServer: HttpServer;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        HomeModule,
        ConfigModule.forRoot({
          isGlobal: true,
          load: [appConfig],
          envFilePath: ['.env'],
          validationSchema: JoiValidationSchema,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
    httpServer = app.getHttpServer();
  });

  afterEach(async () => {
    await app.close();
  });

  describe('/home (GET) endpoint', () => {
    it('should return app info', () => {
      return request(httpServer)
        .get('/home')
        .expect(200)
        .then(({ body }) => {
          expect(typeof body === 'object').toBe(true);
          expect(typeof body?.name).toBe('string');
          expect(typeof body?.version).toBe('string');
        });
    });
  });
});
