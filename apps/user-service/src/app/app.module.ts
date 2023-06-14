import { UserServiceCoreModule } from '@campuscalendar/backend/user-service/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserServiceCoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
