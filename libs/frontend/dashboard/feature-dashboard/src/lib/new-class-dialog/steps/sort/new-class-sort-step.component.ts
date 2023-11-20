import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NewClassFacade } from '@campuscalendar/dashboard-data-access';
import { ButtonModule } from 'primeng/button';
import { PickListModule } from 'primeng/picklist';


@Component({
  selector: 'campuscalendar-new-class-sort-step',
  standalone: true,
  imports: [
    CommonModule,
    PickListModule,
    ButtonModule
  ],
  templateUrl: './new-class-sort-step.component.html',
  styleUrls: ['./new-class-sort-step.component.scss'],
})
export class NewClassSortStepComponent {
  private newClassFacade = inject(NewClassFacade);

  subjects = [];
  sortedSubjects = [];

  nextStep() {
    this.newClassFacade.nextStep();
  }

}
