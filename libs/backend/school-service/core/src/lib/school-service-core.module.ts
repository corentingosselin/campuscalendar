import { Module } from '@nestjs/common';
import { SchoolServiceFeatureModule } from '@campuscalendar/backend/school-service/feature';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { CampusEntity, ClassSchedulerEntity, ClassYearEntity, SchoolEntity, SharedCalendarEntity, SubjectEntity, SubjectEventEntity } from '@campuscalendar/backend/school-service/data-access';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    SchoolServiceFeatureModule,
    MikroOrmModule.forRootAsync(
      {
        useFactory: (configService: ConfigService) => {
          const dbPort = configService.get<string>('SCHOOL_SERVICE_DB_PORT');
          return ({
          registerRequestContext: false,
          debug: true,
          type: 'mysql' as const,
          host: configService.get<string>('SCHOOL_SERVICE_MYSQL_HOST'),
          port: dbPort ? parseInt(dbPort) : undefined,
          dbName: configService.get<string>('MYSQL_DATABASE'),
          user: configService.get<string>('MYSQL_USER'),
          password: configService.get<string>('MYSQL_PASSWORD'),
          entities: [
            CampusEntity,
            SchoolEntity,
            SubjectEntity,
            ClassYearEntity,
            ClassSchedulerEntity,
            SubjectEventEntity,
            SharedCalendarEntity
          ],
          migrations: {
            path: 'apps/school-service/migrations',
          },
        })},
        inject: [ConfigService],

    }),
  ],
})
export class SchoolServiceCoreModule {}
