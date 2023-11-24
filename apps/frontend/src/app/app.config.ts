import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter, withDebugTracing } from '@angular/router';
import { environment } from '@campuscalendar/environment';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { routes } from './app.routes';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { unAuthorizedInterceptor } from './interceptors/unauthorized.interceptor';
import { addTokenInterceptor } from './interceptors/jwt.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        baseUrlInterceptor,
        addTokenInterceptor,
        unAuthorizedInterceptor,
      ])
    ),
    provideRouter(routes,  withDebugTracing()), //  withDebugTracing()
    importProvidersFrom(
      BrowserAnimationsModule,
      NgxsModule.forRoot([], {
        developmentMode: !environment.production,
      }),
      // devtools always last
      NgxsReduxDevtoolsPluginModule.forRoot()
    ),
  ],
};
