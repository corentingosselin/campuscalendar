import { Route } from '@angular/router';
import { PersonalInfoComponent } from './steps/personal-info/personal-info.component';
import { FeatureSetupComponent } from './feature-setup/feature-setup.component';
import { SchoolComponent } from './steps/school/school.component';

export const coreRoutes: Route[] = [
  {
    path: '',
    component: FeatureSetupComponent,
    loadChildren: () => routes,
  },
];

const routes: Route[] = [
  { path: 'personal-info', component: PersonalInfoComponent },
  { path: 'school', component: SchoolComponent },
  { path: '', redirectTo: 'personal-info', pathMatch: 'full' },

  // ...
] satisfies Route[];
