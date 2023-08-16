import { Module } from '@nestjs/common';
import { SchoolServiceFeatureModule } from '@campuscalendar/backend/school-service/feature';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import mikroOrmConfig from '../mikro-orm.config';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    SchoolServiceFeatureModule,
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
export class SchoolServiceCoreModule {}
