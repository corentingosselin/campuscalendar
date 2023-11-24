import {
  BaseEntity,
  ClassScheduler,
  SubjectEvent,
  Year,
} from '@campuscalendar/shared/api-interfaces';
import {
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  Property,
} from '@mikro-orm/core';
import { CampusEntity } from './campus.entity';
import { SubjectEventEntity } from './subject-event.entity';

@Entity()
export class ClassSchedulerEntity extends BaseEntity implements ClassScheduler {
  @Property()
  name!: string;

  @Property()
  startDate!: Date;

  @Property()
  endDate!: Date;

  @ManyToOne(() => CampusEntity)
  campus!: CampusEntity;

  @Property()
  availableDates!: Date[];

  @Property()
  year!: Year;

  @OneToMany(
    () => SubjectEventEntity,
    (subjectEvent) => subjectEvent.classScheduler
  )
  private _subjectEvents!: Collection<SubjectEventEntity>;

  // Adapter methods
  get subjectEvents(): SubjectEvent[] {
    return this._subjectEvents.toArray();
  }

  set subjectEvents(subjectEvents: SubjectEventEntity[]) {
    this._subjectEvents.set(subjectEvents);
  }
}
