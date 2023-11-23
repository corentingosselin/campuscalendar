import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { NewClassFacade } from '@campuscalendar/dashboard-data-access';
import { GlobalDialogService } from '@campuscalendar/dialog';
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

  form = new FormGroup({
    className: new FormControl<string>('', Validators.required),
    dateRange: new FormControl([], Validators.required),
    campus: new FormControl<Campus | undefined>(undefined, Validators.required),
    year: new FormControl<Year | undefined>(undefined, Validators.required),
  });

  rangeDates: Date[] | undefined;
  campus: Campus[] = [
    {
      id: "1",
      name: "Campus de Lille",
      created_at: new Date(),
      updated_at: new Date(),
      classYears: []
    },
    {
      id: "2",
      name: "Campus de Lyon",
      created_at: new Date(),
      updated_at: new Date(),
      classYears: []
    },
    {
      id: "3",
      name: "Campus de Bordeaux",
      created_at: new Date(),
      updated_at: new Date(),
      classYears: []
    },
    {
      id: "4",
      name: "Campus de Marseille",
      created_at: new Date(),
      updated_at: new Date(),
      classYears: []
    },
    {
      id: "5",
      name: "Campus de Montpellier",
      created_at: new Date(),
      updated_at: new Date(),
      classYears: []
    },
    {
      id: "6",
      name: "Campus de Nantes",
      created_at: new Date(),
      updated_at: new Date(),
      classYears: []
    },
    {
      id: "7",
      name: "Campus de Paris",
      created_at: new Date(),
      updated_at: new Date(),
      classYears: []
    },
    {
      id: "8",
      name: "Campus de Rennes",
      created_at: new Date(),
      updated_at: new Date(),
      classYears: []
    },
    {
      id: "9",
      name: "Campus de Strasbourg",
      created_at: new Date(),
      updated_at: new Date(),
      classYears: []
    },
    {
      id: "10",
      name: "Campus de Toulouse",
      created_at: new Date(),
      updated_at: new Date(),
      classYears: []
    }
  ];

  years: Year[] = [
    {
      'id': '1',
      'name': '1ère année',
      'created_at': new Date(),
      'updated_at': new Date()
    },
    {
      'id': '2',
      'name': '2ème année',
      'created_at': new Date(),
      'updated_at': new Date()
    },
    {
      'id': '3',
      'name': '3ème année',
      'created_at': new Date(),
      'updated_at': new Date()
    },
    {
      'id': '4',
      'name': 'Master 1',
      'created_at': new Date(),
      'updated_at': new Date()
    },
    {
      'id': '5',
      'name': 'Master 2',
      'created_at': new Date(),
      'updated_at': new Date()
    }
  ];
  selectedYear: string | undefined;

  selectedCampus: string | undefined;

  nextStep() {
    if(!this.form.valid) return;

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
