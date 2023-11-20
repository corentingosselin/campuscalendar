import { ConfigurationStateModel } from './new-class.model';

export class UpdateConfigStep {
  static readonly type = '[New Class] Update Config Step';
  constructor(public payload: ConfigurationStateModel) {}
}

export class UpdateStep {
  static readonly type = '[New Class] Update Step';
}
