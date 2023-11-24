import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SchoolService } from '@campuscalendar/school';
import { MenuItem } from 'primeng/api';
import { StepsModule } from 'primeng/steps';

@Component({
  selector: 'campuscalendar-feature-setup',
  standalone: true,
  imports: [RouterModule, StepsModule],
  templateUrl: './feature-setup.component.html',
  styleUrls: ['./feature-setup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureSetupComponent implements OnInit {
  private router = inject(Router);
  private schoolService = inject(SchoolService);
  items: MenuItem[] | undefined;

  ngOnInit() {

    if(this.schoolService.isSchoolExist()) {
      this.router.navigate(['/']);
      return;
    }

    this.items = [
      {
        label: 'Administrateur',
        routerLink: 'personal-info',
      },
      {
        label: 'École',
        routerLink: 'school',
      },
      {
        label: 'Campus',
        routerLink: 'campus',
      },
      {
        label: 'Confirmation',
        routerLink: 'confirmation',
      },
    ];
  }
}
