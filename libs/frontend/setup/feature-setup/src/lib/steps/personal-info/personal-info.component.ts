import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ConfigurationService } from '@campuscalendar/data-access';
import { AdminDto } from '@campuscalendar/shared/api-interfaces';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  ValidateFieldDirective,
  ValidationMessageComponent,
  ValidationService,
} from '@campuscalendar/validator';

@Component({
  selector: 'campuscalendar-step-personal-info',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ReactiveFormsModule,
    CommonModule,
    ValidationMessageComponent,
    ValidateFieldDirective,
  ],
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PersonalInfoComponent implements OnInit {
  private router = inject(Router);
  public validationService = inject(ValidationService);
  private configService = inject(ConfigurationService);

  adminForm = new FormGroup(
    {
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: this.validationService.passwordMatchingValidator }
  );

  save() {
    const firstName = this.adminForm.value.firstName;
    const lastName = this.adminForm.value.lastName;
    const email = this.adminForm.value.email;
    const password = this.adminForm.value.password;
    const confirmPassword = this.adminForm.value.confirmPassword;

    if (firstName && lastName && email && password && confirmPassword) {
      const adminData: AdminDto = {
        firstName,
        lastName,
        email,
        password,
        confirmPassword,
      };

      this.configService.updatePersonalInfo(adminData);
    }
  }

  public nextPage() {
    if (this.adminForm.valid) {
      this.save();
      this.router.navigate(['setup/school']);
    }
  }

  ngOnInit(): void {
    this.fillForm();
    this.adminForm.get('password')?.valueChanges.subscribe(() => {
      this.adminForm.get('confirmPassword')?.updateValueAndValidity();
    });

    this.adminForm.get('confirmPassword')?.valueChanges.subscribe(() => {
      this.adminForm.updateValueAndValidity();
    });
  }

  fillForm() {
    const info = this.configService.getConfigurationData().admin;
    this.adminForm.patchValue({
      firstName: info?.firstName,
      lastName: info?.lastName,
      email: info?.email,
      password: info?.password,
      confirmPassword: info?.confirmPassword,
    });
  }
}
