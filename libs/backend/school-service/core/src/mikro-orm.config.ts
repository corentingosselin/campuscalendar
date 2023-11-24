import {
  CampusEntity, ClassSchedulerEntity, ClassYearEntity, SchoolEntity, SubjectEntity, SubjectEventEntity,
} from '@campuscalendar/backend/school-service/data-access';
import { Options } from '@mikro-orm/core';

export default {
  type: 'mysql' as const,
  host: process.env['SCHOOL_SERVICE_MYSQL_HOST'],
  port: process.env['SCHOOL_SERVICE_DB_PORT']
    ? parseInt(process.env['SCHOOL_SERVICE_DB_PORT'])
    : undefined,
  dbName: process.env['MYSQL_DATABASE'],
  user: process.env['MYSQL_USER'],
  password: process.env['MYSQL_PASSWORD'],
  entities: [
    CampusEntity,
    SchoolEntity,
    SubjectEntity,
    ClassYearEntity,
    ClassSchedulerEntity,
    SubjectEventEntity
  ],
  migrations: {
    path: 'apps/school-service/migrations',
  },
} as Options;
