import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'campuscalendar-authentification-data-access',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './authentification-data-access.component.html',
  styleUrls: ['./authentification-data-access.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthentificationDataAccessComponent {}
