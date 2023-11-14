import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import { SchoolYearCardComponent } from '../../school-year-card/school-year-card.component';
import { KeyFilterModule } from 'primeng/keyfilter';

interface SchoolYear {
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
    KeyFilterModule,
  ],
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolComponent {

  private router = inject(Router);
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

  onYearRemoved(yearName: string) {
    this.years = this.years.filter(year => year.name !== yearName);
  }

  nextPage() {
    this.router.navigate(['steps/payment']);
  }

  previousPage() {
    this.router.navigate(['setup/personal-info']);
  }
}
