import { Injectable, inject } from '@angular/core';
import { AuthService } from '@campuscalendar/authentification-data-access';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  private authService = inject(AuthService);
  canActivate() {
    return this.authService.isUserLoggedIn();
  }
}
