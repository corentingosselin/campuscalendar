import { CommonModule } from '@angular/common';
import { Component, Input, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ClassSchedulerFacade, SchoolService } from '@campuscalendar/dashboard-data-access';
import { SchoolFacade } from '@campuscalendar/school';
import { Campus } from '@campuscalendar/shared/api-interfaces';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { first, tap } from 'rxjs';


@Component({
  selector: 'campuscalendar-duplicate-form',
  standalone: true,
  imports: [CommonModule, CardModule, DropdownModule, ReactiveFormsModule, FormsModule, InputTextModule, ButtonModule],
  providers: [],
  templateUrl: './duplicate-form.component.html',
  styleUrls: ['./duplicate-form.component.scss'],
})
export class DuplicateFormComponent {
  private classFacade = inject(ClassSchedulerFacade);
  private schoolFacade = inject(SchoolFacade);
  private schoolService = inject(SchoolService);

  schoolState$ = this.schoolFacade.schoolState$;

  form = new FormGroup({
    className: new FormControl('', Validators.required),
    campus: new FormControl<Campus | undefined>(undefined, Validators.required),
  });

  selectedCampus: string | undefined;

  @Input() classSchedulerId? : string;

  duplicate() {

    if(this.form.invalid) {
      return;
    }


    let schoolId : string | undefined = undefined;
    this.schoolState$?.pipe(
      first()
    ).subscribe(school => schoolId = school.school?.id);

    const { className, campus } = this.form.value;
    if(className && campus && this.classSchedulerId && schoolId) {

    this.schoolService.duplicateClassScheduler({
      name: className,
      campusId: campus.id,
      schoolId: schoolId,
      classSchedulerId: this.classSchedulerId
    }).pipe(
      tap((response) => {
        this.classFacade.addClass(response)
      })
    ).subscribe();

  }
  }  

  
}
