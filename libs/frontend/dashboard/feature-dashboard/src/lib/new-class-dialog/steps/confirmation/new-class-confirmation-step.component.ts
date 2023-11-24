import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { CalendarFeatureComponent } from '@campuscalendar/calendar-feature';
import {
  NewClassFacade,
  SubjectTime,
} from '@campuscalendar/dashboard-data-access';
import { SchoolFacade } from '@campuscalendar/school';
import {
  CalendarSubjectEvent,
  SubjectEvent,
} from '@campuscalendar/shared/api-interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'campuscalendar-new-class-confirmation-step',
  standalone: true,
  imports: [CommonModule, CalendarFeatureComponent],
  templateUrl: './new-class-confirmation-step.component.html',
  styleUrls: ['./new-class-confirmation-step.component.scss'],
})
export class NewClassConfirmationStepComponent implements OnInit {
  private newClassFacade = inject(NewClassFacade);
  private schoolFacade = inject(SchoolFacade);

  schoolState$ = this.schoolFacade.schoolState$;

  calendarEvent?: CalendarSubjectEvent;
  subjectEvents?: SubjectEvent[];
  scheduleSubjects(
    subjects: SubjectTime[],
    availableDates: Date[],
    maxHoursPerDay: number
  ): SubjectEvent[] {
    const schedule: SubjectEvent[] = [];
    let dateIndex = 0;
    
    const formatTime = (hours: number) => hours.toString().padStart(2, '0') + ':00';
  
    // Create a copy of subjects array to avoid mutating original objects
    const subjectsCopy = subjects.map(subject => ({ ...subject, remainingTime: subject.time }));
  
    while (dateIndex < availableDates.length && subjectsCopy.some(subject => subject.remainingTime > 0)) {
      const currentDate = new Date(availableDates[dateIndex]);
      currentDate.setHours(9, 0, 0, 0); // Set start time to 9:00 AM
      let startHour = 9;
      let dailyHoursRemaining = maxHoursPerDay;
  
      while (dailyHoursRemaining > 0 && subjectsCopy.some(subject => subject.remainingTime > 0)) {
        const subject = subjectsCopy.find(subject => subject.remainingTime > 0);
        if (!subject) break;
  
        let hoursAllocated = Math.min(subject.remainingTime, dailyHoursRemaining);
        // Adjust for lunch break
        if (startHour < 12 && startHour + hoursAllocated > 12) {
          hoursAllocated = 12 - startHour;
        }
  
        subject.remainingTime -= hoursAllocated;
        dailyHoursRemaining -= hoursAllocated;
  
        const endHour = startHour + hoursAllocated;
        schedule.push({
          subject: subject,
          date: new Date(currentDate),
          startTime: formatTime(startHour),
          endTime: formatTime(endHour)
        });
  
        startHour += hoursAllocated;
        if (startHour >= 12 && startHour < 13) {
          startHour = 13; // Skip lunch break
        }
  
        if (startHour >= (9 + maxHoursPerDay)) {
          break; // Day is filled, move to next day
        }
      }
  
      dateIndex++; // Move to the next date
    }
  
    if (subjectsCopy.some(subject => subject.remainingTime > 0)) {
      throw new Error('Not enough available dates to schedule all subjects');
    }
  
    return schedule;
  }
  

  ngOnInit() {
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
      });

    if (!startDate || !endDate) return;
    this.subjectEvents = this.scheduleSubjects(
      subjectTimes,
      availableDates,
      maxHoursPerDay
    );

    this.calendarEvent = {
      startDate: startDate,
      endDate: endDate,
      subjectEvents: this.subjectEvents,
      availableDates: availableDates,
    };
  }
}
