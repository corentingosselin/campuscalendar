import { ApiGatewayDataAccessModule } from '@campuscalendar/backend/api-gateway/data-access';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [

  ],
  providers: [

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
