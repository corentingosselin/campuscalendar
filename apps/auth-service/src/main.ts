/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app/app.module';
import { MessageBrokerService } from '@campuscalendar/backend/shared/message-broker';
import { ConfigService } from '@nestjs/config';
import { AUTH_SERVICE } from '@campuscalendar/backend/shared/network';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const msgBrokerService = app.get(MessageBrokerService);
  const clientOtions = msgBrokerService.getOptions(AUTH_SERVICE);
  app.connectMicroservice(clientOtions);
  await app.startAllMicroservices();

  const config = app.get(ConfigService);

  app.useGlobalPipes(
    new ValidationPipe({
      enableDebugMessages: true,
      disableErrorMessages: config.get('NODE_ENV') === 'production',
      stopAtFirstError: true,
      forbidUnknownValues: true,
      skipMissingProperties: false,
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  const port = config.get('AUTH_SERVICE_PORT') || 3300;
  await app.listen(port);
  Logger.log(
    `🚀 Auth Service is running on: http://localhost:${port}`
  );
}

bootstrap();
