import { Campus, Subject, Year } from '@campuscalendar/shared/api-interfaces';
export interface DialogStateModel {
  currentStep: number;
  config: ConfigurationStateModel;
  subjects: Subject[];
  availableDates: Date[];
  subjectTimes: SubjectTime[];
  hoursPerDay: number;
}

export interface ConfigurationStateModel {
  name: string;
  startDate?: Date;
  endDate?: Date;
  campus?: Campus;
  year?: Year;
}

export interface SubjectTime extends Subject {
  time: number;
}

export const DEFAULT_STATE: DialogStateModel = {
  currentStep: 0,
  config: {
    name: '',
    startDate: undefined,
    endDate: undefined,
    year: undefined,
    campus: undefined,
  },
  subjects: [],
  availableDates: [],
  subjectTimes: [],
  hoursPerDay: 0,
};
