import {
  BaseEntity
} from '@campuscalendar/shared/api-interfaces';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { ClassSchedulerEntity } from './class-scheduler.entity';

@Entity()
export class SubjectEventEntity extends BaseEntity {
  @Property()
  startTime!: string;

  @Property()
  endTime!: string;

  @Property()
  date!: Date;

  @Property()
  subjectId!: string;

  @ManyToOne(() => ClassSchedulerEntity)
  classScheduler!: ClassSchedulerEntity;
}
