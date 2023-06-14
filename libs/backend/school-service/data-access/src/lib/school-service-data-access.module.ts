import { SharedMessageBrokerModule } from '@campuscalendar/backend/shared/message-broker';
import {  USER_SERVICE } from '@campuscalendar/backend/shared/network';
import { Module } from '@nestjs/common';

@Module({
    controllers: [],
    providers: [],
    exports: [],
    imports: [
      SharedMessageBrokerModule.registerClient({
        name: USER_SERVICE,
      }),
    ],
  })
export class SchoolServiceDataAccessModule {}
