import { Route } from '@angular/router';
import { FeatureDashboardComponent } from './feature/feature-dashboard.component';
import { DashboardHomeComponent } from './home/dashboard-home.component';

export const routes: Route[] = [
  {
    path: '',
    component: FeatureDashboardComponent,
    loadChildren: () => internalRoutes,
    
  },
];

const internalRoutes: Route[] = [
  { path: 'home', component: DashboardHomeComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // ...
] satisfies Route[];
