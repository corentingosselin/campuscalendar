import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CalendarFeatureComponent } from '@campuscalendar/calendar-feature';
import {
  ClassSchedulerFacade,
  NewClassFacade,
  SubjectTime,
} from '@campuscalendar/dashboard-data-access';
import { GlobalDialogService } from '@campuscalendar/dialog';
import { SchoolFacade, SchoolService } from '@campuscalendar/school';
import {
  CalendarClassScheduler,
  ClassSchedulerDto,
  SubjectEvent,
} from '@campuscalendar/shared/api-interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { EMPTY, catchError, tap } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'campuscalendar-new-class-confirmation-step',
  standalone: true,
  imports: [CommonModule, CalendarFeatureComponent, ButtonModule],
  providers: [MessageService],
  templateUrl: './new-class-confirmation-step.component.html',
  styleUrls: ['./new-class-confirmation-step.component.scss'],
})
export class NewClassConfirmationStepComponent implements OnInit {
  private newClassFacade = inject(NewClassFacade);
  private classSchedulerFacade = inject(ClassSchedulerFacade);
  private schoolFacade = inject(SchoolFacade);
  private schoolService = inject(SchoolService);
  private messageService = inject(MessageService);

  schoolState$ = this.schoolFacade.schoolState$;

  classScheduler?: ClassSchedulerDto;
  calendar?: CalendarClassScheduler;

  subjectEvents?: SubjectEvent[];
  scheduleSubjects(
    subjects: SubjectTime[],
    availableDates: Date[],
    maxHoursPerDay: number
  ): SubjectEvent[] {
    const schedule: SubjectEvent[] = [];
    let dateIndex = 0;
    const formatTime = (hours: number) =>
      hours.toString().padStart(2, '0') + ':00';

    const subjectsCopy = subjects.map((subject) => ({
      ...subject,
      remainingTime: subject.time,
    }));

    while (dateIndex < availableDates.length) {
      const currentDate = new Date(availableDates[dateIndex]);
      currentDate.setHours(9, 0, 0, 0); // Set start time to 9:00 AM
      let startHour = 9;
      let dailyHoursRemaining = maxHoursPerDay;

      for (const subject of subjectsCopy) {
        if (subject.remainingTime <= 0) continue;

        while (subject.remainingTime > 0 && dailyHoursRemaining > 0) {
          let hoursAllocated = Math.min(
            subject.remainingTime,
            dailyHoursRemaining
          );
          if (startHour < 12 && startHour + hoursAllocated > 12) {
            hoursAllocated = 12 - startHour; // Adjust for lunch break
          }

          subject.remainingTime -= hoursAllocated;
          dailyHoursRemaining -= hoursAllocated;

          const endHour = startHour + hoursAllocated;
          schedule.push({
            subject: subject,
            date: new Date(currentDate),
            startTime: formatTime(startHour),
            endTime: formatTime(endHour),
          });

          startHour += hoursAllocated;
          if (startHour >= 12 && startHour < 13) {
            startHour = 13; // Skip lunch break
          }

          if (startHour >= 9 + maxHoursPerDay) {
            break; // Day is filled, move to next day
          }
        }

        if (dailyHoursRemaining === 0) {
          break; // Move to next day if the day is filled
        }
      }

      dateIndex++; // Increment to the next day
    }

    if (subjectsCopy.some((subject) => subject.remainingTime > 0)) {
      throw new Error('Not enough available dates to schedule all subjects');
    }

    return schedule;
  }

  ngOnInit() {
    let className = '';
    let schoolId = '';
    let campusId = '';
    let classYearId = '';
    let startDate: Date | undefined;
    let endDate: Date | undefined;
    let subjectTimes: SubjectTime[] = [];
    let maxHoursPerDay = 7;
    let availableDates: Date[] = [];
    this.newClassFacade.newClassState$
      ?.pipe(untilDestroyed(this))
      .subscribe((state) => {
        subjectTimes = [...state.subjectTimes];
        maxHoursPerDay = state.hoursPerDay;
        startDate = state.config.startDate;
        endDate = state.config.endDate;
        availableDates = [...state.availableDates];
        className = state.config.name;
        if (state.config.campus) campusId = state.config.campus.id;
        classYearId = state.config.year?.id || '';
      });

    this.schoolState$?.pipe(untilDestroyed(this)).subscribe((state) => {
      schoolId = state.school?.id || '';
    });

    if (!startDate || !endDate) return;
    this.subjectEvents = this.scheduleSubjects(
      subjectTimes,
      availableDates,
      maxHoursPerDay
    );

    this.calendar = {
      startDate: startDate,
      endDate: endDate,
      availableDates: availableDates,
      subjectEvents: this.subjectEvents,
    };

    this.classScheduler = {
      name: className,
      campusId: campusId,
      schoolId,
      classYearId,
      calendar: {
        startDate: startDate,
        endDate: endDate,
        availableDates: availableDates,
        subjectEvents: this.subjectEvents.map((event) => ({
          subjectId: event.subject.id,
          date: event.date,
          startTime: event.startTime,
          endTime: event.endTime,
        })),
      },
    };
    console.log(this.classScheduler);
  }

  nextStep() {
    if (!this.classScheduler) return;
    this.schoolService
      .registerClassScheduler(this.classScheduler)
      .pipe(
        tap((response) => {
          this.classSchedulerFacade.addClass(response);
          // close dialog
          GlobalDialogService.closeCurrentDialog();
          this.newClassFacade.reset();
        }),
        catchError((error) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: error.error.message,
          });
          return EMPTY;
        })
      )
      .subscribe();
  }
}
