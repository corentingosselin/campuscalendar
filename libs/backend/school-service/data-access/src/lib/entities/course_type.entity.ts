import { BaseEntity, CourseType } from "@campuscalendar/shared/api-interfaces";
import { Entity, Property } from "@mikro-orm/core";


@Entity()
export class CourseTypeEntity extends BaseEntity implements CourseType {

  @Property()
  name!: string;

  @Property()
  duration!: number;

  @Property()
  priority!: number;
}
