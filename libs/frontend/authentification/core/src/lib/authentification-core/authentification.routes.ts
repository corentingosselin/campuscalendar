import { Route } from '@angular/router';
import { AuthentificationCoreComponent } from './authentification-core.component';

export const routes: Route[] = [
  {
    path: '',
    component: AuthentificationCoreComponent,
    loadChildren: () =>
      import('@campuscalendar/authentification-feature-login').then(
        (m) => m.routes
      ),
  },
  // ...
];
