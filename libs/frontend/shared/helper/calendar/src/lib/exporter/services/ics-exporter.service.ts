import { Injectable } from '@angular/core';
import { AbstractExporterService } from './abstract-exporter.service';
import convertToICal from '../converter.util';
import { ClassScheduler } from '@campuscalendar/shared/api-interfaces';

@Injectable({ providedIn: 'root' })
export class IcsExporterService extends AbstractExporterService {
  export(calendarData: ClassScheduler): File {
    const icalData = convertToICal(calendarData);
    return new File([icalData], 'calendar.ics', { type: 'text/calendar' });
  }
}
