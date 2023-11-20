import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { TooltipModule } from 'primeng/tooltip';
import { CalendarOptions } from '@fullcalendar/core'; 
import multiMonthPlugin from '@fullcalendar/multimonth'
import { FullCalendarModule } from '@fullcalendar/angular';

@Component({
  selector: 'campuscalendar-class-page',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ToolbarModule,
    ButtonModule,
    DividerModule,
    TooltipModule,
    FullCalendarModule
  ],
  templateUrl: './class-page.component.html',
  styleUrls: ['./class-page.component.scss'],
})
export class ClassPageComponent {

  calendarOptions: CalendarOptions = {
    initialView: 'multiMonthYear',
    plugins: [multiMonthPlugin],
    events: [
      { title: 'event 1', date: '2023-11-17' },
      { title: 'event 2', date: '2023-11-17' }
    ]
  };



}
