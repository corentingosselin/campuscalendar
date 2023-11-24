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

export interface CalendarSubjectEvent {
  startDate: Date;
  endDate: Date;
  subjectEvents: SubjectEvent[];
  availableDates: Date[];
}

export interface SubjectEvent  {
  subject: Subject;
  date: Date;
  startTime: string; 
  endTime: string;  
}

export interface ClassScheduler extends Entity {
  name: string;
  year: Year;
  campus: Campus;
  startDate: Date;
  endDate: Date;
  subjectEvents: SubjectEvent[];
}
