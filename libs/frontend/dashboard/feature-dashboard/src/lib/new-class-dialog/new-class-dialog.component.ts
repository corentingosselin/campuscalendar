import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StepsModule } from 'primeng/steps';
import { MenuItem } from 'primeng/api';
import { CalendarModule } from 'primeng/calendar';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { NewClassConfigStepComponent } from './steps/config/new-class-config-step.component';
import { DialogStateModel, NewClassFacade } from '@campuscalendar/dashboard-data-access';
import { Observable } from 'rxjs';
import { NewClassSortStepComponent } from './steps/sort/new-class-sort-step.component';
import { NewClassValueStepComponent } from './steps/value/new-class-value-step.component';
import { NewClassOffDayStepComponent } from './steps/offday-calendar/new-class-offday-step.component';

@Component({
  selector: 'campuscalendar-new-class-dialog',
  standalone: true,
  imports: [
    CommonModule,
    StepsModule,
    CalendarModule,
    FormsModule,
    DividerModule,
    NewClassConfigStepComponent,
    NewClassSortStepComponent,
    NewClassValueStepComponent,
    NewClassOffDayStepComponent
  ],
  templateUrl: './new-class-dialog.component.html',
  styleUrls: ['./new-class-dialog.component.scss'],
})
export class NewClassDialogComponent implements OnInit {
  rangeDates: Date[] | undefined;

  steps: MenuItem[] | undefined;

  
  private newClassFacade = inject(NewClassFacade);
  
  newClassState$?: Observable<DialogStateModel>  = this.newClassFacade.newClassState$;

  ngOnInit() {
    this.steps = [
      {
        label: 'Configuration',
      },
      {
        label: 'Ordre des matières',

      },
      {
        label: 'Jours sans cours',
      },
      {
        label: 'Matières',
      },
      {
        label: 'Confirmation',
    
      },
    ];
  }
}
