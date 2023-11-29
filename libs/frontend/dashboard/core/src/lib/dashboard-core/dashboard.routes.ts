import { Route } from '@angular/router';
import { DashboardCoreComponent } from './dashboard-core.component';
import { NgxsModule } from '@ngxs/store';
import {
  AccountState,
  ClassSchedulerState,
  NewClassDialogState,
} from '@campuscalendar/dashboard-data-access';
import { importProvidersFrom } from '@angular/core';
import { CalendarDatesState } from '@campuscalendar/calendar';
import { MessageService } from 'primeng/api';

export const routes: Route[] = [
  {
    path: '',
    component: DashboardCoreComponent,
    loadChildren: () =>
      import('@campuscalendar/feature-dashboard').then((m) => m.routes),
    providers: [
      MessageService,
      importProvidersFrom(
        NgxsModule.forFeature([
          NewClassDialogState,
          AccountState,
          CalendarDatesState,
          ClassSchedulerState,
        ])
      ),
    ],
  },
];
