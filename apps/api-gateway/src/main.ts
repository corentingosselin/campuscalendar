/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { ConfigService } from '@nestjs/config';
import { RpcToHttpExceptionFilter } from '@campuscalendar/backend/shared/network';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const config = app.get(ConfigService);

  app.useGlobalFilters(new RpcToHttpExceptionFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      disableErrorMessages: config.get('NODE_ENV') === 'production',
      stopAtFirstError: true,
      forbidUnknownValues: true,
      skipMissingProperties: false, // if value is missing, the validator does not check
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  const port = config.get('API_GATEWAY_PORT') || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 API-GATEWAY is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
