import { CommonModule } from '@angular/common';
import { Component, OnInit, ViewChild, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarDatesFacade, Holiday } from '@campuscalendar/calendar';
import {
  DialogStateModel,
  NewClassFacade,
} from '@campuscalendar/dashboard-data-access';
import {
  FullCalendarComponent,
  FullCalendarModule,
} from '@fullcalendar/angular';
import { CalendarOptions } from '@fullcalendar/core';
import frLocale from '@fullcalendar/core/locales/fr';
import dayGridMonthPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import multiMonthPlugin from '@fullcalendar/multimonth';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';

@UntilDestroy()
@Component({
  selector: 'campuscalendar-new-class-offday-step',
  standalone: true,
  imports: [
    CommonModule,
    FullCalendarModule,
    ButtonModule,
    CheckboxModule,
    FormsModule,
  ],
  templateUrl: './new-class-offday-step.component.html',
  styleUrls: ['./new-class-offday-step.component.scss'],
})
export class NewClassOffDayStepComponent implements OnInit {
  private newClassFacade = inject(NewClassFacade);
  private calendarFacade = inject(CalendarDatesFacade);

  _excludeWeekends = true;

  set excludeWeekends(value: boolean) {
    this._excludeWeekends = value;
    this.updateCalendarOptions(true);
  }

  get excludeWeekends(): boolean {
    return this._excludeWeekends;
  }

  newClassState$ = this.newClassFacade.newClassState$;
  calendarState$ = this.calendarFacade.calendarState$;

  @ViewChild('calendarRef') calendarComponent?: FullCalendarComponent;

  newClassState?: DialogStateModel;
  holidays?: string[];
  calendarOptions?: CalendarOptions;

  disabledDates: string[] = [];
  blockedDates: string[] = [];

  ngOnInit() {
    this.newClassState$?.pipe(untilDestroyed(this)).subscribe((state) => {
      this.newClassState = state;
    });

    this.calendarState$?.pipe(untilDestroyed(this)).subscribe((state) => {
      this.holidays = state.holidays.map((holiday: Holiday) => holiday.date);
    });

    this.updateCalendarOptions();
  }

  updateCalendarOptions(fetchEvents = false) {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      plugins: [
        multiMonthPlugin,
        dayGridMonthPlugin,
        interactionPlugin,
      ],
      locale: frLocale,
      weekends: !this._excludeWeekends,

      dayCellDidMount: (info) => {
        if (!this.holidays) return;
        const dateStr = this.formatDateToLocalISOString(info.date);
        if (this.holidays.includes(dateStr)) {
          info.el.classList.add('fc-day-disabled');
          this.blockedDates.push(dateStr);
        }
      },
      dateClick: (info) => {
        const clickedDateStr = this.formatDateToLocalISOString(info.date);
        if (
          this.disabledDates.includes(clickedDateStr) &&
          !this.blockedDates.includes(clickedDateStr)
        ) {
          // Remove date from disabledDates
          this.disabledDates = this.disabledDates.filter(
            (date) => date !== clickedDateStr
          );
          info.dayEl.classList.remove('fc-day-disabled');
          return;
        }
        this.disabledDates.push(clickedDateStr);
        info.dayEl.classList.add('fc-day-disabled');
      },
      // Enable date selection
      selectable: false,
      visibleRange: {
        start: this.newClassState?.config?.startDate,
        end: this.newClassState?.config.endDate,
      },
      validRange: {
        start: this.newClassState?.config?.startDate,
        end: this.newClassState?.config.endDate,
      },
    };
    if (fetchEvents) { 
      if (!this.calendarComponent) return;
      this.calendarComponent.getApi().refetchEvents();
    }
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

  getAvailableDates(startDate: Date, endDate: Date): Date[] {
    const availableDates: Date[] = [];
    const currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      // Check if the date is not a weekend
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6;
      // Format the date to match your disabledDates and blockedDates format
      const formattedDate = this.formatDateToLocalISOString(currentDate);
  
      // Check if the date is not in disabledDates or blockedDates
      const isDisabled = this.disabledDates.includes(formattedDate);
      const isBlocked = this.blockedDates.includes(formattedDate);
  
      if (!isWeekend && !isDisabled && !isBlocked) {
        availableDates.push(new Date(currentDate));
      }
  
      // Go to next day
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return availableDates;
  }
  

  nextStep() {
    this.newClassFacade.nextStep();
    // TODO: Add off days to config
    const start = this.newClassState?.config?.startDate;
    const end = this.newClassState?.config?.endDate;
    if (!start || !end) return;
    const availableDates = this.getAvailableDates(start, end);
    this.newClassFacade.updateAvailableDatesStep(availableDates);
  }

  private formatDateToLocalISOString(date: Date): string {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - offset * 60 * 1000);
    return adjustedDate.toISOString().split('T')[0];
  }
}
