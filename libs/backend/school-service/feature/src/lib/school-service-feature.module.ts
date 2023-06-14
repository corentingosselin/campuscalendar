import { Module } from '@nestjs/common';

import { SharedMessageBrokerModule } from '@campuscalendar/backend/shared/message-broker';
import { SchoolServiceDataAccessModule } from '@campuscalendar/backend/school-service/data-access';
@Module({
  controllers: [
  ],
  providers: [],
  exports: [],
  imports: [
    SchoolServiceDataAccessModule,
    SharedMessageBrokerModule
  ]
})
export class SchoolServiceFeatureModule {}
