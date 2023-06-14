import { Module } from '@nestjs/common';
import { SchoolServiceFeatureModule } from '@campuscalendar/backend/school-service/feature';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    SchoolServiceFeatureModule,
  ],
})
export class SchoolServiceCoreModule {}
