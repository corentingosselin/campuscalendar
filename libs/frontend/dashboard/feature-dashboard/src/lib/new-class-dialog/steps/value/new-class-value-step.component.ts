import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewClassFacade, SubjectTime } from '@campuscalendar/dashboard-data-access';
import { Subject } from '@campuscalendar/shared/api-interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';


@UntilDestroy()
@Component({
  selector: 'campuscalendar-new-class-value-step',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    TableModule,
    FormsModule,
    InputNumberModule,
    ReactiveFormsModule,
    DividerModule
  ],
  templateUrl: './new-class-value-step.component.html',
  styleUrls: ['./new-class-value-step.component.scss'],
})
export class NewClassValueStepComponent implements OnInit {
  private newClassFacade = inject(NewClassFacade);

  private changeDetectorRef = inject(ChangeDetectorRef);
  defaultTime = 21;

  defaultTimeFormControl = new FormControl(this.defaultTime);
  dayTimeControl = new FormControl(7);

  subjects: Subject[] = [];
  subjectTime: SubjectTime[] = [];

  availableDates: Date[] = [];
  isSufficientHours = false;
  totalAvailableHours = 0;
  totalRequiredHours = 0;

  ngOnInit() {
    this.newClassFacade.newClassState$
      ?.pipe(untilDestroyed(this))
      .subscribe((newClass) => {
        if (!newClass) return;
        this.availableDates = [...newClass.availableDates];
      });

    this.newClassFacade.newClassState$
      ?.pipe(untilDestroyed(this))
      .subscribe((newClass) => {
        if (!newClass) return;
        this.subjects = [...newClass.subjects];
      });

    //add default time to each subject
    this.subjects.forEach((subject) => {
      this.subjectTime.push({ ...subject, time: this.defaultTime });
    });

    this.updateSubjectTime();

    this.dayTimeControl.valueChanges.subscribe(() => {
      this.updateSubjectTime();
    });

    this.defaultTimeFormControl.valueChanges.subscribe((value) => {
      const time = value;
      if (!time) return;
      for (let i = 0; i < this.subjects.length; i++) {
        this.subjectTime[i].time = value;
      }
      this.changeDetectorRef.detectChanges();

      this.updateSubjectTime();
    });
  }

  updateSubjectTime() {
    this.totalRequiredHours = this.calculateTotalRequiredHours(
      this.subjectTime
    );
    this.totalAvailableHours = this.calculateTotalAvailableHours(
      this.availableDates,
      this.dayTimeControl.value ?? 7
    );
    this.isSufficientHours = this.checkIfSufficientHours(
      this.availableDates,
      this.subjectTime,
      this.dayTimeControl.value ?? 7
    );

  }

  handleSubjectTimeChange(subject: SubjectTime, newTime: number) {
    // Find the subject in the array and update its time
    const updatedSubjects = this.subjectTime.map(s => {
      if (s.id === subject.id) {
        return { ...s, time: newTime };
      }
      return s;
    });
  
    // Update the subjectTime array with the new array
    this.subjectTime = updatedSubjects;
  
    // Update required hours and check if sufficient
    this.updateSubjectTime();
  }

  calculateTotalAvailableHours(
    availableDates: Date[],
    hoursPerDay: number
  ): number {
    return availableDates.length * hoursPerDay;
  }

  calculateTotalRequiredHours(subjects: SubjectTime[]): number {
    return subjects.reduce((total, subject) => total + subject.time, 0);
  }

  checkIfSufficientHours(
    availableDates: Date[],
    subjects: SubjectTime[],
    hoursPerDay: number
  ): boolean {
    const totalAvailableHours = this.calculateTotalAvailableHours(
      availableDates,
      hoursPerDay
    );
    const totalRequiredHours = this.calculateTotalRequiredHours(subjects);

    return totalAvailableHours >= totalRequiredHours;
  }

  nextStep() {
    if (!this.isSufficientHours) return;
    this.newClassFacade.updateSubjectTimeStep({
      subjectTimes: this.subjectTime,
      hoursPerDay: this.dayTimeControl.value ?? 7,
    });
    this.newClassFacade.nextStep();
  }
}
