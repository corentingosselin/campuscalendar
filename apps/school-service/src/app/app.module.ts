import { SchoolServiceCoreModule } from '@campuscalendar/backend/school-service/core';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SchoolServiceCoreModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
