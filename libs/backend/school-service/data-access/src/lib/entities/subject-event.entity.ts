import {
  BaseEntity,
  SubjectEvent,
} from '@campuscalendar/shared/api-interfaces';
import { Entity, ManyToMany, ManyToOne, Property } from '@mikro-orm/core';
import { SubjectEntity } from './subject.entity';
import { ClassSchedulerEntity } from './class-scheduler.entity';

@Entity()
export class SubjectEventEntity extends BaseEntity implements SubjectEvent {
  @Property()
  startTime!: string;

  @Property()
  endTime!: string;

  @Property()
  date!: Date;

  @ManyToMany(() => SubjectEntity)
  subject!: SubjectEntity;

  @ManyToOne(() => ClassSchedulerEntity)
  classScheduler!: ClassSchedulerEntity;
}
