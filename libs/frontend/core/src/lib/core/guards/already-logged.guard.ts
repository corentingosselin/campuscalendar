import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@campuscalendar/authentification-data-access';
@Injectable({
  providedIn: 'root',
})
export class AlreadyLoggedGuard {
  private authService = inject(AuthService);
  private router = inject(Router);
  canActivate() {
    const isLogged = this.authService.isUserLoggedIn();
    if (isLogged) {
      this.router.navigate(['/']);
    }
    return !isLogged;
  }
}
