import { Route } from '@angular/router';
import { FeatureDashboardComponent } from './feature/feature-dashboard.component';
import { DashboardHomeComponent } from './home/dashboard-home.component';
import { ClassPageComponent } from './class-page/class-page.component';

export const routes: Route[] = [
  {
    path: '',
    component: FeatureDashboardComponent,
    loadChildren: () => internalRoutes,
    
  },
];

const internalRoutes: Route[] = [
  { path: 'home', component: DashboardHomeComponent },
  { path: 'class', component: ClassPageComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  // ...
] satisfies Route[];
