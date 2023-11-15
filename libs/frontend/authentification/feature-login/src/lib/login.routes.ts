import { Route } from '@angular/router';
import { FeatureLoginComponent } from './feature-login.component';

export const routes : Route[] = [
  { path: 'login', component: FeatureLoginComponent },
  // ...
] satisfies Route[];
