import { Collection } from "@mikro-orm/core";
import { Entity } from "./entity.interface";

export interface School extends Entity {
    name: string;
    classYear: ClassYear[];
}

export interface ClassYear extends Entity {
    name: string;
    subjects: string[];
}

export interface Campus extends Entity {
    name: string;
}

export interface Class extends Entity {
    name: string;
    campus: Campus;
    studentIds: number[];
}

export interface CourseType extends Entity {
    name: string;
    duration: number;
    priority: number;
}

export interface Course extends Entity {
    courseType: CourseType;
    class: Class;
    teacherId: number;
    scheduleSlots: Collection<CourseScheduleSlot, Course>;
}

export interface CourseScheduleSlot extends Entity {
    course: Course;
    startDateTime: Date;
    endDateTime: Date;
}
    

