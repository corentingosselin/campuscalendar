import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { DragDropModule } from 'primeng/dragdrop';
import { SpeedDialModule } from 'primeng/speeddial';
import { DialogModule } from 'primeng/dialog';
import { SchoolYear } from '../steps/school/school.component';
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

  @Output() remove = new EventEmitter<string>();

  @Output() add = new EventEmitter<SchoolYear>();


  @Input() yearName = 'No name';
  @Input() subjects: string[] = [];


  addSubject() {
    this.add.emit({
      name: this.yearName,
      subjects: this.subjects,
    });
  }

  removeYear() {
    this.remove.emit(this.yearName);
  }
  
}
