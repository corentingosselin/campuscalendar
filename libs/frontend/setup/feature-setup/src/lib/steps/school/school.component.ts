import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { SchoolYearCardComponent } from '../../school-year-card/school-year-card.component';

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
  ],
  templateUrl: './school.component.html',
  styleUrls: ['./school.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolComponent {
  private router = inject(Router);
  values: string[] | undefined;

  nextPage() {
    this.router.navigate(['steps/payment']);
  }

  previousPage() {
    this.router.navigate(['setup/personal-info']);
  }
}
