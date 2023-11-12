import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('@campuscalendar/core').then((m) => m.ROUTES),
  },
];
