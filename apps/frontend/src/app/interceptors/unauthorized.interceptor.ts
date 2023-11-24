import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@campuscalendar/authentification-data-access';
import { Observable, catchError, throwError } from 'rxjs';

export const unAuthorizedInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {

  const authService = inject(AuthService);
  return next(req).pipe(
    catchError((err) => {
      if (err.status === 401) {
        // Handle 401 error, e.g., redirect to login
        authService.logout();
      }
      return throwError(() => err);
    })
  );
};