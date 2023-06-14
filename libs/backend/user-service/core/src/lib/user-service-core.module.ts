import { Module } from '@nestjs/common';
import { UserServiceFeatureModule } from '@campuscalendar/backend/user-service/feature';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    UserServiceFeatureModule,
  ],
})
export class UserServiceCoreModule {}
