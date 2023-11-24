import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CalendarSubjectEvent } from '@campuscalendar/shared/api-interfaces';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridMonthPlugin from '@fullcalendar/daygrid';
import multiMonthPlugin from '@fullcalendar/multimonth';

@Component({
  selector: 'campuscalendar-calendar-feature',
  standalone: true,
  imports: [CommonModule, FullCalendarModule],
  templateUrl: './calendar-feature.component.html',
  styleUrls: ['./calendar-feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalendarFeatureComponent implements OnInit {
  @Input() calendarEvent?: CalendarSubjectEvent = {
    startDate: new Date(),
    endDate: new Date(),
    subjectEvents: [],
    availableDates: [],
  };

  @ViewChild('calendarRef') calendarComponent?: FullCalendarComponent;
  calendarOptions?: CalendarOptions;

  ngOnInit(): void {
    const formattedAvailableDates = this.calendarEvent?.availableDates.map(date =>
      this.formatDateToLocalISOString(date)
    );
    const enableWeekends = this.hasWeekend(this.calendarEvent?.availableDates);

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [multiMonthPlugin, dayGridMonthPlugin],
      locale: frLocale,
      weekends: enableWeekends,
      // Enable date selection
      selectable: false,
      dayCellDidMount: (info) => {
        const dateStr = this.formatDateToLocalISOString(info.date);
        if (!formattedAvailableDates?.includes(dateStr)) {
          info.el.classList.add('fc-day-disabled');
        }
      },
      visibleRange: {
        start: this.calendarEvent?.startDate,
        end: this.calendarEvent?.endDate,
      },
      validRange: {
        start: this.calendarEvent?.startDate,
        end: this.calendarEvent?.endDate,
      },
      eventOrder: 'start',
      displayEventTime: false,
    
      events: this.calendarEvent?.subjectEvents.map(event => ({
        title: `${event.startTime} - ${event.endTime} ${event.subject.name}`,
        start: event.date,
        end: new Date(
          event.date.getFullYear(), 
          event.date.getMonth(), 
          event.date.getDate(), 
          parseInt(event.endTime.split(':')[0]), // Convert to number
          parseInt(event.endTime.split(':')[1])  // Convert minutes part to number, if needed
        ),
      }))
    };
  }


  private formatDateToLocalISOString(date: Date): string {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split('T')[0];
  }

  private hasWeekend(availableDates?: Date[]): boolean {
    if(!availableDates) return false;
    return availableDates.some(date => {
      const day = date.getDay();
      return day === 0 || day === 6; // 0 for Sunday, 6 for Saturday
    });
  }
  
}
