import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import { SchoolYearCardComponent } from '../../school-year-card/school-year-card.component';
import { CommonModule } from '@angular/common';
import {
  ValidateFieldDirective,
  ValidationMessageComponent,
  ValidationService,
} from '@campuscalendar/validator';
import { ConfigurationService } from '@campuscalendar/data-access';

export interface SchoolYear {
  name: string;
  subjects: string[];
}

@Component({
  selector: 'campuscalendar-step-school',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ChipsModule,
    FormsModule,
    CardModule,
    SchoolYearCardComponent,
    OrderListModule,
    ReactiveFormsModule,
    CommonModule,
    ValidationMessageComponent,
    ValidateFieldDirective,
  ],
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolComponent implements OnInit {
  private router = inject(Router);

  public validationService = inject(ValidationService);
  private configService = inject(ConfigurationService);

  form = new FormGroup({
    schoolName: new FormControl('', Validators.required),
    yearName: new FormControl(''),
  });

  years: SchoolYear[] = [];

  addYear(yearName: string) {
    this.years = [
      ...this.years,
      {
        name: yearName,
        subjects: [],
      },
    ];
  }

  onSubjectAdded(schoolYear: SchoolYear) {
    //add the new subject to existing year
    this.years[
      this.years.findIndex((year) => year.name === schoolYear.name)
    ].subjects = schoolYear.subjects;
  }

  onYearRemoved(yearName: string) {
    this.years = this.years.filter((year) => year.name !== yearName);
  }

  isSchoolReady() {
    return (
      this.years.length > 0 && this.form.valid && this.isYearCardAreValid()
    );
  }

  isYearCardAreValid() {
    //check if each yearNames have at least one subject
    return this.years.every((year) => year.subjects.length > 0);
  }

  save() {
    this.configService.updateSchoolInfo({
      name: this.form.value.schoolName || '',
      classYear: this.years,
    });
  }

  nextPage() {
    this.save();
    this.router.navigate(['setup/campus']);
  
  }

  previousPage() {
    this.save();
    this.router.navigate(['setup/personal-info']);
  }

  ngOnInit() {
    this.fillForm();
  }

  fillForm() {
    const info = this.configService.getConfigurationData().school;
    this.form.patchValue({
      schoolName: info?.name,
    });
    if (info?.classYear) {
      this.years = info?.classYear;
    }
  }
}
