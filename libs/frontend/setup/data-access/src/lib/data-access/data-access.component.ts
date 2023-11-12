import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'campuscalendar-data-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './data-access.component.html',
  styleUrls: ['./data-access.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DataAccessComponent {}
