import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
@Component({
  selector: 'campuscalendar-school-year-card',
  standalone: true,
  imports: [
    InputTextModule,
    ButtonModule,
    ChipsModule,
    FormsModule,
    CardModule,
    DragDropModule,
    SpeedDialModule,
    DialogModule,
  ],
  templateUrl: './school-year-card.component.html',
  styleUrls: ['./school-year-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolYearCardComponent {


  @Input() yearName = 'No name';

  values: string[] = [];

  visible = false;

  showDialog() {
    this.visible = true;
  }

  removeYear() {
    //
  }
  
}
