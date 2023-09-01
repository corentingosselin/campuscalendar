import { BaseEntity, Campus } from "@campuscalendar/shared/api-interfaces";
import { Entity, Property } from "@mikro-orm/core";

@Entity()
export class CampusEntity extends BaseEntity implements Campus {

  @Property()
  name!: string;
}