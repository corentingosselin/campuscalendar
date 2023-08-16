import { BaseEntity, Course, CourseScheduleSlot } from "@campuscalendar/shared/api-interfaces";
import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { CourseEntity } from "./course.entity";

@Entity()
export class CourseScheduleSlotEntity extends BaseEntity implements CourseScheduleSlot {

  @ManyToOne(() => CourseEntity)
  course!: Course;

  @Property()
  startDateTime!: Date;

  @Property()
  endDateTime!: Date;
}
