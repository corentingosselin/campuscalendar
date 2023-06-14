import { AuthServiceCoreModule } from '@campuscalendar/backend/auth-service/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    AuthServiceCoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
