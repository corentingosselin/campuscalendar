import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@campuscalendar/authentification-data-access';
@Injectable({
  providedIn: 'root',
})
export class AuthGuard {

  private router = inject(Router);

  private authService = inject(AuthService);
  canActivate() {
    const isUserLogged = this.authService.isUserLoggedIn();
    if(!isUserLogged) {
      this.router.navigate(['/login']);
    }
    return isUserLogged;
  }
}
