import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  CalendarClassSchedulerResponse
} from '@campuscalendar/shared/api-interfaces';
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
  @Input() calendar?: CalendarClassSchedulerResponse = {
    startDate: new Date(),
    endDate: new Date(),
    availableDates: [],
    subjectEvents: [
      {
        subject: {
          id: '',
          name: '',
          created_at: new Date(),
          updated_at: new Date(),
        },
        date: new Date(),
        startTime: '',
        endTime: 'string',

      },
    ],
  };

  @ViewChild('calendarRef') calendarComponent?: FullCalendarComponent;
  calendarOptions?: CalendarOptions;

  ngOnInit(): void {
    const formattedAvailableDates = this.calendar?.availableDates.map(
      (date) => this.formatDateToLocalISOString(date)
    );
    const enableWeekends = this.hasWeekend(this.calendar?.availableDates);

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
      initialDate: this.calendar?.startDate,
      visibleRange: {
        start: this.calendar?.startDate,
        end: this.calendar?.endDate,
      },
      validRange: {
        start: this.calendar?.startDate,
        end: this.calendar?.endDate,
      },
      eventOrder: 'start',
      displayEventTime: false,

      events: this.calendar?.subjectEvents.map((event) => ({
        title: `${event.startTime} - ${event.endTime} ${event.subject.name}`,
        start: event.date,
        end: new Date(
          event.date.getFullYear(),
          event.date.getMonth(),
          event.date.getDate(),
          parseInt(event.endTime.split(':')[0]), // Convert to number
          parseInt(event.endTime.split(':')[1]) // Convert minutes part to number, if needed
        ),
      })),
    };
  }

  private formatDateToLocalISOString(date: Date): string {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split('T')[0];
  }

  private hasWeekend(availableDates?: Date[]): boolean {
    if (!availableDates) return false;
    return availableDates.some((date) => {
      const day = date.getDay();
      return day === 0 || day === 6; // 0 for Sunday, 6 for Saturday
    });
  }
}
