import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthService } from '@campuscalendar/authentification-data-access';

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
export class FeatureLoginComponent implements OnInit {

  private router = inject(Router);
  private authService = inject(AuthService);  

  ngOnInit() {
    if(this.authService.isUserLoggedIn()) {
      this.router.navigate(['/']);
    }
  }
}
