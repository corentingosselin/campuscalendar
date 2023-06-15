import { Module } from '@nestjs/common';

import { AuthServiceDataAccessModule } from '@campuscalendar/backend/auth-service/data-access';
import { SharedMessageBrokerModule } from '@campuscalendar/backend/shared/message-broker';
import { AuthController } from './auth.controller';
@Module({
  controllers: [
    AuthController
  ],
  providers: [],
  exports: [],
  imports: [
    AuthServiceDataAccessModule,
    SharedMessageBrokerModule
  ]
})
export class AuthServiceFeatureModule {}
