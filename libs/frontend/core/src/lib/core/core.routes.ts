import { Route } from '@angular/router';

export const ROUTES: Route[] = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: '',
    children: [ 
      {
        path: '',
        loadChildren: () =>
          import('@campuscalendar/authentification-core').then(
            (m) => m.routes
          ),
      },
      {
        path: 'setup',
        loadChildren: () =>
          import('@campuscalendar/feature-setup').then(
            (m) => m.coreRoutes
          ),

      },
      {
        path: 'dashboard',
        loadChildren: () =>
          import('@campuscalendar/dashboard-core').then(
            (m) => m.routes
          ),
      }
    ],
  },
];
