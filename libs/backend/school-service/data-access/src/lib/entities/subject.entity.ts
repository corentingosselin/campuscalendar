import { BaseEntity, Subject } from '@campuscalendar/shared/api-interfaces';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { ClassYearEntity } from './class-year.entity';

@Entity()
export class SubjectEntity extends BaseEntity implements Subject {

  @Property()
  name!: string;

  @ManyToOne(() => ClassYearEntity)
  classYear!: ClassYearEntity;
  
}