import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';

@Component({
  selector: 'campuscalendar-feature',
  standalone: true,
  imports: [CommonModule, HomeComponent],
  templateUrl: './feature.component.html',
  styleUrls: ['./feature.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FeatureComponent {


}
