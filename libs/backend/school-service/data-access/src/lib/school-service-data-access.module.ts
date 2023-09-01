import { SharedMessageBrokerModule } from '@campuscalendar/backend/shared/message-broker';
import { USER_SERVICE } from '@campuscalendar/backend/shared/network';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { CampusEntity } from './entities/campus.entity';
import { ClassEntity } from './entities/class.entity';
import { CourseEntity } from './entities/course.entity';
import { CourseScheduleSlotEntity } from './entities/course_schedule_slot.entity';
import { CourseTypeEntity } from './entities/course_type.entity';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    MikroOrmModule.forFeature([
      CampusEntity,
      ClassEntity,
      CourseEntity,
      CourseScheduleSlotEntity,
      CourseTypeEntity,
    ]),
    SharedMessageBrokerModule.registerClient({
      name: USER_SERVICE,
    }),
  ],
})
export class SchoolServiceDataAccessModule {}
