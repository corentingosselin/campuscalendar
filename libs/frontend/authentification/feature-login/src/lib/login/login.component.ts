import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { CheckboxModule } from 'primeng/checkbox';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '@campuscalendar/authentification-data-access';
import {
  LoadingState,
  LoginUserDto,
} from '@campuscalendar/shared/api-interfaces';
import { CommonModule } from '@angular/common';
import { t } from '@mikro-orm/core';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'campuscalendar-login',
  standalone: true,
  imports: [
    ButtonModule,
    InputTextModule,
    PasswordModule,
    CheckboxModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private authService = inject(AuthService);

  loadingState = new BehaviorSubject<LoadingState>({ loading: false });

  loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  login() {
    if (this.loginForm.invalid) return;
    const loginDto = this.loginForm.value as LoginUserDto;

    this.loadingState.next({ ...this.loadingState.value, loading: true });

    this.authService.login(loginDto).subscribe({
      next: () => {
        this.loadingState.next({ loading: false, errorMessage: undefined });
      },
      error: (error) => {
        this.loadingState.next({ loading: false, errorMessage: error.message });
      },
    });
  }
}
