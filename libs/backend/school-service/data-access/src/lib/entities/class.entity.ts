import { BaseEntity, Class } from "@campuscalendar/shared/api-interfaces";
import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { CampusEntity } from "./campus.entity";

@Entity()
export class ClassEntity extends BaseEntity implements Class {

  @Property()
  name!: string;

  @ManyToOne(() => CampusEntity)
  campus!: CampusEntity;

  @Property({ type: 'array' })
  studentIds!: number[];
}

