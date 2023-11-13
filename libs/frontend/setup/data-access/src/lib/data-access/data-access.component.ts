import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'campuscalendar-data-access',
  standalone: true,
  imports: [],
  templateUrl: './data-access.component.html',
  styleUrls: ['./data-access.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataAccessComponent {}
