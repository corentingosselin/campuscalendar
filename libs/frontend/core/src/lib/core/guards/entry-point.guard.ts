import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthService } from '@campuscalendar/authentification-data-access';
@Injectable({
  providedIn: 'root',
})
export class EntryPointGuard {
  private router = inject(Router);
  private http = inject(HttpClient);
  private authService = inject(AuthService);


  canActivate() {
    return this.http.get<boolean>('api/school/exists').pipe(
      map((exists) => {
        if (!exists) {
          this.router.navigate(['/setup']);
          return false;
        }

        if(this.router.url === '/login' && this.authService.isUserLoggedIn()) {
          this.router.navigate(['/']);
          return false;
        }

        if (!this.authService.isUserLoggedIn()) {
          this.router.navigate(['/login']);
          return false;
        }

        return true;
      })
    );
  }
}
