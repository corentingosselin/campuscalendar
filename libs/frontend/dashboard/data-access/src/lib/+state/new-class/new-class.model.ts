import { Campus, Year } from '@campuscalendar/shared/api-interfaces';
export interface DialogStateModel {
  currentStep: number;
  config: ConfigurationStateModel;
}

export interface ConfigurationStateModel {
  name: string;
  startDate?: Date;
  endDate?: Date;
  campus?: Campus;
  year?: Year;
}
