import { Module } from '@nestjs/common';

import { SharedMessageBrokerModule } from '@campuscalendar/backend/shared/message-broker';
import { SchoolServiceDataAccessModule } from '@campuscalendar/backend/school-service/data-access';
import { SchoolController } from './school.controller';
@Module({
  controllers: [
    SchoolController
  ],
  providers: [],
  exports: [],
  imports: [
    SchoolServiceDataAccessModule,
    SharedMessageBrokerModule
  ]
})
export class SchoolServiceFeatureModule {}
