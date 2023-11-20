import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import {
  DialogStateModel,
  NewClassFacade,
} from '@campuscalendar/dashboard-data-access';
import { environment } from '@campuscalendar/environment';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import googleCalendarPlugin from '@fullcalendar/google-calendar';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import dayGridMonthPlugin from '@fullcalendar/daygrid';
import { ButtonModule } from 'primeng/button';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'campuscalendar-new-class-offday-step',
  standalone: true,
  imports: [CommonModule, FullCalendarModule, ButtonModule],
  templateUrl: './new-class-offday-step.component.html',
  styleUrls: ['./new-class-offday-step.component.scss'],
})
export class NewClassOffDayStepComponent implements OnInit {
  private newClassFacade = inject(NewClassFacade);
  newClassState$ = this.newClassFacade.newClassState$;

  @ViewChild('calendarRef') calendarComponent?: FullCalendarComponent;

  newClassState?: DialogStateModel;

  calendarOptions?: CalendarOptions;

  ngOnInit() {
    this.newClassState$?.pipe(untilDestroyed(this)).subscribe((state) => {
      this.newClassState = state;
    });

    console.log('date', this.newClassState?.config.startDate);

    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [multiMonthPlugin,dayGridMonthPlugin, googleCalendarPlugin, interactionPlugin],
      googleCalendarApiKey: environment.googleCalendarApiKey,
      locale: frLocale,
      eventClick: function (clickInfo) {
        // Check if the event is from Google Calendar
        if (clickInfo?.event?.url.includes('google.com')) {
          // Prevent default action (opening Google Calendar)
          clickInfo.jsEvent.preventDefault();
        } else {
          clickInfo.event.remove();
        }
      },
      eventSources: [
        {
          googleCalendarId: 'fr.french#holiday@group.v.calendar.google.com',
          className: 'gcal-event', // Optional CSS class for styling Google Calendar events
        },
        [
     
        ],
      ],
      dateClick: this.addOffDay.bind(this),
      // Enable date selection
      selectable: true,
      visibleRange: {
        start: this.newClassState?.config?.startDate,
        end: this.newClassState?.config.endDate,
      },
      validRange: {
        start: '2020-10-05',
        end: '2020-10-22'
      }
    };
  }
  addOffDay(info: any) {
    if (!this.calendarComponent) return;
    const calendarApi = this.calendarComponent.getApi();
    const dateStr = info.dateStr;
    const events = calendarApi.getEvents();
    const isOffDayAlreadyPresent = events.some((event) => {
      return event.startStr === dateStr;
    });

    if (isOffDayAlreadyPresent) return;
    calendarApi.addEvent({
      title: 'Sans cours',

      start: dateStr,
      allDay: true,
    });
  }

  nextStep() {
    this.newClassFacade.nextStep();
  }
}
