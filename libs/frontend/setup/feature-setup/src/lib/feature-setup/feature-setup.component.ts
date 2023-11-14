import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
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


  items: MenuItem[] | undefined;

  ngOnInit() {
      this.items = [
          {
              label: 'Administrateur',
              routerLink: 'personal-info'
          },
          {
              label: 'École',
              routerLink: 'school'
          },
          {
              label: 'Campus',
              routerLink: 'campus'
          },
          {
              label: 'Confirmation',
              routerLink: 'confirmation'
          }
      ];
  }
}
