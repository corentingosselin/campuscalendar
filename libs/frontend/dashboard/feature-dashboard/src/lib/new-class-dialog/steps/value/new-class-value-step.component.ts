import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewClassFacade } from '@campuscalendar/dashboard-data-access';
import { ButtonModule } from 'primeng/button';
import { InputNumberModule } from 'primeng/inputnumber';
import { TableModule } from 'primeng/table';

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
  ],
  templateUrl: './new-class-value-step.component.html',
  styleUrls: ['./new-class-value-step.component.scss'],
})
export class NewClassValueStepComponent implements OnInit {
  private newClassFacade = inject(NewClassFacade);
  private changeDetectorRef = inject(ChangeDetectorRef);
  defaultTime = 5;

  defaultTimeFormControl = new FormControl(this.defaultTime);
  dayTimeControl = new FormControl(7);


  subjects = [
    {
      name: 'Math',
      time: 0,
    },
    {
      name: 'Science',
      time: 0,
    },
    {
      name: 'History',
      time: 0,
    },
    {
      name: 'English',
      time: 0,
    },
    {
      name: 'Spanish',
      time: 0,
    },
    {
      name: 'French',
      time: 0,
    },
    {
      name: 'German',
      time: 0,
    },
    {
      name: 'Chinese',
      time: 0,
    },
    {
      name: 'Japanese',
      time: 0,
    },
    {
      name: 'Korean',
      time: 0,
    },
    {
      name: 'Italian',
      time: 0,
    },
    {
      name: 'Russian',
      time: 0,
    },
    {
      name: 'Latin',
      time: 0,
    },
    {
      name: 'Arabic',
      time: 0,
    },
    {
      name: 'Hindi',
      time: 0,
    },
    {
      name: 'Biology',
      time: 0,
    },
    {
      name: 'Chemistry',
      time: 0,
    },
    {
      name: 'Physics',
      time: 0,
    },
    {
      name: 'Geology',
      time: 0,
    },
    {
      name: 'Astronomy',
      time: 0,
    },
    {
      name: 'Geography',
      time: 0,
    },
    {
      name: 'Psychology',
      time: 0,
    },
    {
      name: 'Sociology',
      time: 0,
    },
    {
      name: 'Anthropology',
      time: 0,
    },
    {
      name: 'Philosophy',
      time: 0,
    },
  ];

  ngOnInit() {
    //set default time for each subject
    for (let i = 0; i < this.subjects.length; i++) {
      this.subjects[i].time = this.defaultTime;
    }

    this.defaultTimeFormControl.valueChanges.subscribe((value) => {
      const time = value;
      if (!time) return;
      for (let i = 0; i < this.subjects.length; i++) {
        this.subjects[i].time = value;
      }
      this.changeDetectorRef.detectChanges();

    });
  }
  nextStep() {
    this.newClassFacade.nextStep();
  }
}
