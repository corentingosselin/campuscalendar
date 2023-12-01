import { CommonModule } from '@angular/common';
import {
    ChangeDetectionStrategy,
    Component,
    Input
} from '@angular/core';

@Component({
  selector: 'campuscalendar-404',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './four-o-four.component.html',
  styleUrls: ['./four-o-four.component.css'],
  changeDetection: ChangeDetectionStrategy.Default,
})
export class FourOFourComponent {

  @Input() isCalendar = false;

  getMainMessage() {
    return this.isCalendar ? 'Le calendrier ne semble plus disponible' : 'La page demandée n\'existe pas';
  }


}
