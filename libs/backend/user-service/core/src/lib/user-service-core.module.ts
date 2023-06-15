import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { UserServiceFeatureModule } from '@campuscalendar/backend/user-service/feature';
import mikroOrmConfig from '../mikro-orm.config';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    UserServiceFeatureModule,
    MikroOrmModule.forRootAsync(
      {
        useFactory: () => ({
          registerRequestContext: false,
          debug: true,
          ...mikroOrmConfig
        }),
        inject: [],

    }),
  ],
})
export class UserServiceCoreModule {}
