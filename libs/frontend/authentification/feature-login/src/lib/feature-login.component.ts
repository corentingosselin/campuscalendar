import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';

@Component({
  selector: 'campuscalendar-feature-login',
  standalone: true,
  imports: [RouterModule, LoginComponent],
  template: `
    <router-outlet></router-outlet>
    <campuscalendar-login></campuscalendar-login>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureLoginComponent {}
