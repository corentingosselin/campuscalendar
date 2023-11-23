import { BaseEntity, Campus } from '@campuscalendar/shared/api-interfaces';
import { Entity, ManyToOne, Property } from '@mikro-orm/core';
import { SchoolEntity } from './school.entity';

@Entity()
export class CampusEntity extends BaseEntity implements Campus {

  @Property()
  name!: string;

  @ManyToOne(() => SchoolEntity)
  school!: SchoolEntity;

}
