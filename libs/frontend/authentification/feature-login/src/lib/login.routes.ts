import { Route } from '@angular/router';
import { FeatureLoginComponent } from './feature-login.component';

export const routes : Route[] = [
  { path: '', component: FeatureLoginComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  // ...
] satisfies Route[];
