import { BaseEntity } from '@campuscalendar/shared/api-interfaces';
import { Collection, Entity, OneToMany, Property } from '@mikro-orm/core';
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
  availableDates!: Date[];

  @OneToMany(
    () => SubjectEventEntity,
    (subjectEvent) => subjectEvent.classScheduler
  )
  subjectEvents = new Collection<SubjectEventEntity>(this);
}
