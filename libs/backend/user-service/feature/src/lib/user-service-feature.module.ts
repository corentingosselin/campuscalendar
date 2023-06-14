import { Module } from '@nestjs/common';

import { SharedMessageBrokerModule } from '@campuscalendar/backend/shared/message-broker';
import { UserServiceDataAccessModule } from '@campuscalendar/backend/user-service/data-access';
@Module({
  controllers: [
  ],
  providers: [],
  exports: [],
  imports: [
    UserServiceDataAccessModule,
    SharedMessageBrokerModule
  ]
})
export class UserServiceFeatureModule {}
