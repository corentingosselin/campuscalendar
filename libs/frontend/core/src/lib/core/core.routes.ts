import { importProvidersFrom } from '@angular/core';
import { Route } from '@angular/router';
import { SchoolState } from '@campuscalendar/school';
import { NgxsModule } from '@ngxs/store';
import { AuthGuard } from './guards/auth.guard';
import { SchoolGuard } from './guards/school.guard';
import { AlreadyLoggedGuard } from './guards/already-logged.guard';

export const ROUTES: Route[] = [
  //if path empty redirect to /dashboard
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'dashboard',
  },

  {
    path: '',
    canActivate: [SchoolGuard],
    children: [
      {
        path: 'dashboard',
        canActivate: [AuthGuard],
        loadChildren: () =>
          import('@campuscalendar/dashboard-core').then((m) => m.routes),
        providers: [importProvidersFrom(NgxsModule.forFeature([SchoolState]))],
      },
      {
        path: 'login',
        canActivate: [AlreadyLoggedGuard],
        loadChildren: () =>
          import('@campuscalendar/authentification-feature-login').then(
            (m) => m.routes
          ),
      },
    ],
  },
  {
    path: 'setup',
    loadChildren: () =>
      import('@campuscalendar/feature-setup').then((m) => m.coreRoutes),
  },
];
