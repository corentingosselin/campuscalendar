import { SharedMessageBrokerModule } from '@campuscalendar/backend/shared/message-broker';
import { USER_SERVICE } from '@campuscalendar/backend/shared/network';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';

@Module({
    controllers: [],
    providers: [AuthService],
    exports: [AuthService],
    imports: [
      SharedMessageBrokerModule.registerClient({
        name: USER_SERVICE,
      }),
      JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => {
          return {
            secret: configService.get<string>('JWT_SECRET'),
            signOptions: { expiresIn: '30m' },
          };
        },
        inject: [ConfigService],
      }),
    ],
  })
export class AuthServiceDataAccessModule {}
