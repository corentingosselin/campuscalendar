import { HttpEvent, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from "@angular/common/http";
import { inject } from "@angular/core";
import { AuthService } from "@campuscalendar/authentification-data-access";
import { Observable } from "rxjs";

export const addTokenInterceptor: HttpInterceptorFn = (
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
  ): Observable<HttpEvent<unknown>> => {
  
    const authService = inject(AuthService);
    
    // URLs that do not require authentication
    const noAuthUrls = ['calendrier.api.gouv.fr', 'api/school/calendar/'];
    if (!noAuthUrls.some(url => req.url.includes(url))) {
      const token = authService.getUserSession()?.token;
      if (token) {
        // Clone the request to add the new header.
        req = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${token}`)
        });
      }
    }
  
    // Send the request
    return next(req);
  };
  