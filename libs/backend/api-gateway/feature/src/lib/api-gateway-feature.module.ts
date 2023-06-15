import { ApiGatewayDataAccessModule } from '@campuscalendar/backend/api-gateway/data-access';
import { JwtAuthService, ServiceFactory } from '@campuscalendar/backend/api-gateway/utils';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './controllers/auth.controller';

@Module({
  controllers: [
    AuthController
  ],
  providers: [
    JwtAuthService,
    ServiceFactory
  ],
  exports: [],
  imports: [
    ApiGatewayDataAccessModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: '30m' },
      }),
      inject: [ConfigService],
    }),
  ],
})
export class ApiGatewayFeatureModule {}
