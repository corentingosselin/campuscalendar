import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '@campuscalendar/data-access';
import { SetupSchoolDto } from '@campuscalendar/shared/api-interfaces';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';



@Component({
  selector: 'campuscalendar-step-confirmation',
  standalone: true,
  imports: [
    ButtonModule,
    CardModule,
    DividerModule,
    CommonModule,
    TagModule,
    ChipModule,
  ],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ConfirmationComponent implements OnInit {
  private router = inject(Router);
  private configService = inject(ConfigurationService);

  info: SetupSchoolDto = {
    school: {
      name: '',
      classYears: [],
    },
    campus: [],
    admin: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  };

  ngOnInit() {
    this.info = this.configService.getConfigurationData();
  }


  confirm() {
    //this.router.navigate(['setup/confirmation']);
  }

  previousPage() {
    this.router.navigate(['setup/campus']);
  }

}
