import { BaseEntity } from '@campuscalendar/shared/api-interfaces';
import { Entity, Property } from '@mikro-orm/core';

@Entity()
export class SharedCalendarEntity extends BaseEntity {
  @Property()
  hash!: string;

  @Property()
  classSchedulerId!: string;

  @Property()
  enabled!: boolean;
}
