import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router } from '@angular/router';
import { ConfigurationService } from '@campuscalendar/data-access';
import { SetupSchoolDto } from '@campuscalendar/shared/api-interfaces';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { TagModule } from 'primeng/tag';
import { ChipModule } from 'primeng/chip';
import { EMPTY, catchError, delay, tap } from 'rxjs';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { AuthService } from '@campuscalendar/authentification-data-access';
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
    ToastModule,
  ],
  providers: [MessageService],
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfirmationComponent implements OnInit {
  private router = inject(Router);
  private configService = inject(ConfigurationService);
  private messageService = inject(MessageService);
  private authService = inject(AuthService);

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

  disabledSubmit = false;
  confirm() {
    this.configService
      .registerSchool(this.info)
      .pipe(
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: err.error.message,
          });
          return EMPTY;
        }),
        tap(() => {
          this.messageService.add({
            severity: 'success',
            summary: 'Succès',
            detail: "L'école a été enregistrée avec succès. \n Vous allez être redirigé vers l'accueil.",
            life: 5000,
          });
          this.disabledSubmit = true;
        }),
        delay(5000),
        tap((session) => {
          this.authService.saveUserSession(session);
          this.router.navigate(['/']);
        }),

      )
      .subscribe();
  }

  previousPage() {
    this.router.navigate(['setup/campus']);
  }
}
