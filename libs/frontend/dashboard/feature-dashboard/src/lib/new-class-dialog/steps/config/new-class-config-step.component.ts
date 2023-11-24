import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewClassFacade } from '@campuscalendar/dashboard-data-access';
import { GlobalDialogService } from '@campuscalendar/dialog';
import { SchoolFacade } from '@campuscalendar/school';
import { Campus, Year } from '@campuscalendar/shared/api-interfaces';
import { CalendarModule } from 'primeng/calendar';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'campuscalendar-new-class-config-step',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
    FormsModule,
    DividerModule,
    DropdownModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './new-class-config-step.component.html',
  styleUrls: ['./new-class-config-step.component.scss'],
})
export class NewClassConfigStepComponent {
  private newClassFacade = inject(NewClassFacade);
  private schoolFacade = inject(SchoolFacade);

  schoolState$ = this.schoolFacade.schoolState$;

  form = new FormGroup({
    className: new FormControl('', Validators.required),
    dateRange: new FormControl([], Validators.required),
    campus: new FormControl<Campus | undefined>(undefined, Validators.required),
    year: new FormControl<Year | undefined>(undefined, Validators.required),
  });

  rangeDates: Date[] | undefined;


  selectedYear: string | undefined;

  selectedCampus: string | undefined;


  nextStep() {
    if(!this.form.valid) {
      return;
    }

    const { className, dateRange, campus, year } = this.form.value;
    if(!className || !dateRange || !campus || !year) return;

    const [startDate, endDate] = dateRange;

    this.newClassFacade.updateConfigStep({
      name: className,
      campus,
      year,
      startDate,
      endDate,
    });

    this.newClassFacade.nextStep();
  }

  isDateRangeValid() {
    const dateRanges = this.form.value.dateRange;
    if(!dateRanges) return false;
    return dateRanges[0] && dateRanges[1];
  }

  closeDialog() {
    GlobalDialogService.closeCurrentDialog();
  }


}
