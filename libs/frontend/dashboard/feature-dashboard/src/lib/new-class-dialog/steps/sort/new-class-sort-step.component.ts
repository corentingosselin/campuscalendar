import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { NewClassFacade } from '@campuscalendar/dashboard-data-access';
import { SchoolFacade } from '@campuscalendar/school';
import { Subject } from '@campuscalendar/shared/api-interfaces';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';
import { map, mergeMap, of } from 'rxjs';

@UntilDestroy()
@Component({
  selector: 'campuscalendar-new-class-sort-step',
  standalone: true,
  imports: [CommonModule, PickListModule, ButtonModule],
  templateUrl: './new-class-sort-step.component.html',
  styleUrls: ['./new-class-sort-step.component.scss'],
})
export class NewClassSortStepComponent implements OnInit {
  private newClassFacade = inject(NewClassFacade);
  private schoolFacade = inject(SchoolFacade);
  schoolState$ = this.schoolFacade.schoolState$;

  classYears$ = this.schoolState$?.pipe(
    map((school) => school.school?.classYears)
  );
  selectedClassYear$ = this.newClassFacade.newClassState$?.pipe(
    map((newClass) => newClass.config.year)
  );

  subjects$ = this.classYears$?.pipe(
    mergeMap((classYears) => {
      if (!classYears) return of([]);
      return (
        this.selectedClassYear$?.pipe(
          map((selectedClassYear) => {
            if (!selectedClassYear) return [];
            const foundClassYear = classYears.find(
              (classYear) => classYear.id === selectedClassYear.id
            );
            console.log(foundClassYear);
            return foundClassYear ? foundClassYear.subjects : [];
          })
        ) || of([])
      );
    })
  );

  ngOnInit(): void {
    this.subjects$?.pipe(untilDestroyed(this)).subscribe((subjects) => {
      this.subjects = [...subjects];
    });
  }

  public subjects: Subject[] = [];
  public sortedSubjects: Subject[]  = [];

  nextStep() {
    this.newClassFacade.updateSubjectsStep(this.sortedSubjects);
    this.newClassFacade.nextStep();
  }
}
