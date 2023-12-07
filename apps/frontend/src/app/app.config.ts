import {
  HttpClient,
  provideHttpClient,
  withInterceptors
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { environment } from '@campuscalendar/environment';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsModule } from '@ngxs/store';
import { routes } from './app.routes';
import { baseUrlInterceptor } from './interceptors/base-url.interceptor';
import { addTokenInterceptor } from './interceptors/jwt.interceptor';
import { unAuthorizedInterceptor } from './interceptors/unauthorized.interceptor';


export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(
      withInterceptors([
        baseUrlInterceptor,
        addTokenInterceptor,
        unAuthorizedInterceptor,
      ])
    ),
    provideRouter(routes), //  withDebugTracing()
    importProvidersFrom(
      TranslateModule.forRoot({
        loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [HttpClient]
        }
    }),
      BrowserAnimationsModule,
      NgxsModule.forRoot([], {
        developmentMode: !environment.production,
      }),
      // devtools always last
      NgxsReduxDevtoolsPluginModule.forRoot()
    ),
  ],
};
