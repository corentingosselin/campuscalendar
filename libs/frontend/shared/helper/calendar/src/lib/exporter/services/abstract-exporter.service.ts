import { CalendarClassScheduler, ClassScheduler } from '@campuscalendar/shared/api-interfaces';

export abstract class AbstractExporterService {
  abstract export(calendarData: ClassScheduler): File;
}
