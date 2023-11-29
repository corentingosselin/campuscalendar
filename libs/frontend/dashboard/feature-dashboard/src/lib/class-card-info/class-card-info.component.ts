import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ClassSchedulerInfo } from '@campuscalendar/shared/api-interfaces';

@Component({
  selector: 'campuscalendar-class-card-info',
  standalone: true,
  imports: [CommonModule,CardModule],
  templateUrl: './class-card-info.component.html',
  styleUrls: ['./class-card-info.component.scss'],
})
export class ClassCardInfoComponent {

    @Input() classInfo: ClassSchedulerInfo = {} as ClassSchedulerInfo;

}
