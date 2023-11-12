import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ChipsModule } from 'primeng/chips';
import { FormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { OrderListModule } from 'primeng/orderlist';
import { DragDropModule } from 'primeng/dragdrop';
import { CommonModule } from '@angular/common';
import { SpeedDialModule } from 'primeng/speeddial';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'campuscalendar-school-year-card',
  standalone: true,
  imports: [
    CommonModule,
    InputTextModule,
    ButtonModule,
    ChipsModule,
    FormsModule,
    CardModule,
    OrderListModule,
    DragDropModule,
    SpeedDialModule,
  ],
  templateUrl: './school-year-card.component.html',
  styleUrls: ['./school-year-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SchoolYearCardComponent {
  values: string[] = [];

}
