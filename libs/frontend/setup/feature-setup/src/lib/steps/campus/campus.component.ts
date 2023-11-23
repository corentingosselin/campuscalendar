import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from '@campuscalendar/data-access';
import { ButtonModule } from 'primeng/button';
import { ChipsModule } from 'primeng/chips';
import { InputTextModule } from 'primeng/inputtext';

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
