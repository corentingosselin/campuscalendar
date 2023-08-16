import {
  BaseEntity,
  Class,
  Course,
  CourseScheduleSlot,
  CourseType,
} from '@campuscalendar/shared/api-interfaces';
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { CourseTypeEntity } from './course_type.entity';
import { ClassEntity } from './class.entity';
import { CourseScheduleSlotEntity } from './course_schedule_slot.entity';

@Entity()
export class CourseEntity extends BaseEntity implements Course {

  @ManyToOne(() => CourseTypeEntity)
  courseType!: CourseType;

  @Property()
  teacherId!: number;

  @ManyToOne(() => ClassEntity)
  class!: Class;

  @OneToMany(() => CourseScheduleSlotEntity, (slot) => slot.course)
  scheduleSlots!: Collection<CourseScheduleSlot, Course>;
}
