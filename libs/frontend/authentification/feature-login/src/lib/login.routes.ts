import { Route } from '@angular/router';
import { FeatureLoginComponent } from './feature-login.component';

export const routes : Route[] = [
  { path: 'login', component: FeatureLoginComponent },
    //redirect to login page if not found
    {
      path: '**',
      redirectTo: 'login',
    },
  // ...
] satisfies Route[];
