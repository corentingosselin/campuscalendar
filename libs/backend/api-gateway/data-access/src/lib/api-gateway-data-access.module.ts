import { SharedMessageBrokerModule } from '@campuscalendar/backend/shared/message-broker';
import { AUTH_SERVICE, SCHOOL_SERVICE, USER_SERVICE } from '@campuscalendar/backend/shared/network';
import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { SchoolService } from './services/school.service';

@Module({
    controllers: [],
    providers: [
      AuthService,
      SchoolService
    ],
    exports: [
      AuthService,
      SchoolService
    ],
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
