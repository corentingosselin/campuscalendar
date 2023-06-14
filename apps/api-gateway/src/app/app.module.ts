import { ApiGatewayCoreModule } from '@campuscalendar/backend/api-gateway/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ApiGatewayCoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
