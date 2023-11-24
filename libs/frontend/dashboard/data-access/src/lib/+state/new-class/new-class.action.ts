import { Subject } from '@campuscalendar/shared/api-interfaces';
import { ConfigurationStateModel, SubjectTime } from './new-class.model';

export class UpdateConfigStep {
  static readonly type = '[New Class] Update Config Step';
  constructor(public payload: ConfigurationStateModel) {}
}

export class UpdateSubjectsStep {
  static readonly type = '[New Class] Update Subjects Step';
  constructor(public payload: Subject[]) {}
}

export class UpdateAvailableDatesStep {
  static readonly type = '[New Class] Update Available dates Step';
  constructor(public payload: Date[]) {}
}

export class UpdateSubjectTimeStep {
  static readonly type = '[New Class] Update Subject Time Step';
  constructor(public payload: { hoursPerDay: number, subjectTimes: SubjectTime[]}) {}
}


export class UpdateStep {
  static readonly type = '[New Class] Update Step';
}
