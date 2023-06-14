import { SharedMessageBrokerModule } from '@campuscalendar/backend/shared/message-broker';
import { AUTH_SERVICE, SCHOOL_SERVICE, USER_SERVICE } from '@campuscalendar/backend/shared/network';
import { Module } from '@nestjs/common';

@Module({
    controllers: [],
    providers: [],
    exports: [],
    imports: [
      SharedMessageBrokerModule.registerClient({
        name: AUTH_SERVICE,
      }),
      SharedMessageBrokerModule.registerClient({
        name: SCHOOL_SERVICE,
      }),
      SharedMessageBrokerModule.registerClient({
        name: USER_SERVICE,
      }),
    ],
  })
export class ApiGatewayDataAccessModule {}
