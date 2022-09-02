import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestFactory, Reflector } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import validationOptions from '@common/utils/validation-options';
import { AppModule } from '@app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const reflector = app.get(Reflector);

  app.setGlobalPrefix(configService.get<string>('app.apiPrefix'), {
    exclude: ['/'],
  });
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));
  app.useGlobalPipes(new ValidationPipe(validationOptions));

  await app.listen(configService.get<number>('app.port'));
}
bootstrap();
