import { Subject } from '@campuscalendar/shared/api-interfaces';
import { ConfigurationStateModel } from './new-class.model';

export class UpdateConfigStep {
  static readonly type = '[New Class] Update Config Step';
  constructor(public payload: ConfigurationStateModel) {}
}

export class UpdateSubjectsStep {
  static readonly type = '[New Class] Update Subjects Step';
  constructor(public payload: Subject[]) {}
}

export class UpdateStep {
  static readonly type = '[New Class] Update Step';
}
