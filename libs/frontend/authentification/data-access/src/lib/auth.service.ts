import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
  AccountFacade
} from '@campuscalendar/dashboard-data-access';
import { GlobalDialogService } from '@campuscalendar/dialog';
import {
  HttpError,
  JwtUserSession,
  LoginUserDto,
  UserSessionResponse,
} from '@campuscalendar/shared/api-interfaces';
import * as jwt_decode from 'jwt-decode';
import { catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private accountFacade = inject(AccountFacade);

  login(loginDto: LoginUserDto) {
    return this.http
      .post<UserSessionResponse>('/api/auth/login', loginDto)
      .pipe(
        tap((session) => {
          this.saveUserSession(session);
          this.router.navigate(['/']);
        }),
        catchError((error: HttpErrorResponse) => {
          const customError = {
            status: error.status,
            message:
              error.status === 401
                ? 'Addresse email ou mot de passe incorrect'
                : 'Un problème est survenu, veuillez réessayer plus tard',
          } as HttpError;
          return throwError(() => customError);
        })
      );
  }

  saveUserSession(session: UserSessionResponse) {
    this.accountFacade.setAccountInfo(session.user);
    localStorage.setItem('userSession', JSON.stringify(session));
  }

  getUserSession() {
    const session = localStorage.getItem('userSession');
    return session ? JSON.parse(session) : null;
  }

  isUserLoggedIn() {
    const session = this.getUserSession();
    if (session && session.token) {
      const decodedToken = jwt_decode.jwtDecode<JwtUserSession>(session.token);
      const currentTime = Math.floor(new Date().getTime() / 1000);
      const isExpired = decodedToken.exp > currentTime;
      this.accountFacade.setAccountInfo(session.user);
      return isExpired;
    }
    return false;
  }

  logout() {
    GlobalDialogService.closeCurrentDialog();
    this.accountFacade.removeAccountInfo();
    localStorage.removeItem('userSession');
    this.router.navigate(['/login']);
  }
}
