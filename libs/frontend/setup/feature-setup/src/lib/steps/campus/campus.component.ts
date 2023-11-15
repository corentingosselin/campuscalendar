import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfigurationService } from '@campuscalendar/data-access';

@Component({
  selector: 'campuscalendar-step-campus',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ChipsModule,
    FormsModule,
    CommonModule
  ],
  templateUrl: './campus.component.html',
  styleUrls: ['./campus.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CampusComponent implements OnInit {
  private router = inject(Router);
  private configService = inject(ConfigurationService);
  campus: string[] = [];

  triedToSubmit = false;

  nextPage() {
    this.triedToSubmit = true;
    if (this.campus.length === 0) {
      return;
    }
    this.save();
    this.router.navigate(['setup/confirmation']);
  }

  previousPage() {
    this.save();
    this.router.navigate(['setup/school']);
  }

  fill() {
    this.campus = this.configService.getConfigurationData().campus || [];
  }

  save() {
    this.configService.updateCampusInfo(this.campus);
  }

  ngOnInit() {
    this.fill();
  }
}
