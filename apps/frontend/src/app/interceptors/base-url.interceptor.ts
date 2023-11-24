import { environment } from '@campuscalendar/environment';
import { HttpInterceptorFn } from '@angular/common/http';

export const baseUrlInterceptor: HttpInterceptorFn = (req, next) => {
  if (!environment.production) return next(req);
  const apiReq = req.clone({ url: `${environment.apiBaseUrl}/${req.url}` });
  return next(apiReq);
};
