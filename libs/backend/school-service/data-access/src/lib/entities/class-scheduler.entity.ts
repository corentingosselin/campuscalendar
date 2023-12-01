import { BaseEntity } from '@campuscalendar/shared/api-interfaces';
import {
  Cascade,
  Collection,
  Entity,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { SubjectEventEntity } from './subject-event.entity';

@Entity()
export class ClassSchedulerEntity extends BaseEntity {
  @Property()
  name!: string;

  @Property()
  startDate!: Date;

  @Property()
  endDate!: Date;

  @Property()
  campusId!: string;

  @Property()
  schoolId!: string;

  @Property()
  classYearId!: string;

  @Property()
  availableDates!: Date[];
  @OneToMany(
    () => SubjectEventEntity,
    (subjectEvent) => subjectEvent.classScheduler,
    { orphanRemoval: true, cascade: [Cascade.ALL] }
  )
  subjectEvents = new Collection<SubjectEventEntity>(this);
}
