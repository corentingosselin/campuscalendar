import { Route } from '@angular/router';
import { PersonalInfoComponent } from './steps/personal-info/personal-info.component';
import { FeatureSetupComponent } from './feature-setup/feature-setup.component';
import { SchoolComponent } from './steps/school/school.component';
import { CampusComponent } from './steps/campus/campus.component';
import { ConfirmationComponent } from './steps/confirmation/confirmation.component';

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
  { path: 'campus', component: CampusComponent },
  { path: 'confirmation', component: ConfirmationComponent },
  { path: '', redirectTo: 'personal-info', pathMatch: 'full' },

  // ...
] satisfies Route[];
