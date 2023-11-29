import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { ClassYearEntity } from './entities/class-year.entity';
import { SchoolEntity } from './entities/school.entity';
import { SubjectEntity } from './entities/subject.entity';
import { SchoolService } from './school.service';
import { SubjectEventEntity } from './entities/subject-event.entity';
import { ClassSchedulerEntity } from './entities/class-scheduler.entity';

@Module({
  controllers: [],
  providers: [
    SchoolService
  ],
  exports: [
    SchoolService
  ],
  imports: [
    MikroOrmModule.forFeature([
      ClassSchedulerEntity,
      SubjectEventEntity,
      SchoolEntity,
      ClassYearEntity,
      SubjectEntity,
    ]),
    //register client for user service
   /* SharedMessageBrokerModule.registerClient({
      name: USER_SERVICE,
    }), */
  ],
})
export class SchoolServiceDataAccessModule {}
