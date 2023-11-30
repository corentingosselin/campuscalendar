import { Entity } from './entity.interface';

export interface Campus extends Entity {
  name: string;
}

export interface Year extends Entity {
  name: string;
}

export interface ClassYear extends Entity {
  name: string;
  subjects: Subject[];
}

export interface Subject extends Entity {
  name: string;
}

export interface School extends Entity {
  name: string;
  campuses: Campus[];
  classYears: ClassYear[];
}



/**
 * Interfaces to display calendar
 */

export interface ClassScheduler extends Entity {
  name: string;
  campusName: string;
  classYearName: string;
  schoolName: string;
  calendar: CalendarClassScheduler;
}

export interface ClassSchedulerInfo extends Entity {
  name: string;
  campusName: string;
  classYearName: string;
  campusId: string;
  schoolId: string;
  classYearId: string;
}

export interface SubjectEvent  {
  subject: Subject
  date: Date;
  startTime: string; 
  endTime: string;  
}

export type SubjectEventType = SubjectEvent & Entity;
export interface CalendarClassScheduler {
  startDate: Date;
  endDate: Date;
  availableDates: Date[];
  subjectEvents: SubjectEvent[];
}

