import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';
import { ClassCardInfoComponent } from '../class-card-info/class-card-info.component';
import { FieldsetModule } from 'primeng/fieldset';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { GlobalDialogService } from '@campuscalendar/dialog';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { NewClassDialogComponent } from '../new-class-dialog/new-class-dialog.component';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'campuscalendar-dashboard-home',
  standalone: true,
  providers: [DialogService],
  imports: [
    CommonModule,
    ToolbarModule,
    ButtonModule,
    ClassCardInfoComponent,
    FieldsetModule,
    DividerModule,
    FormsModule,
    InputTextModule,
    DropdownModule,
    DynamicDialogModule,
    ToastModule
  ],
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss'],
})
export class DashboardHomeComponent {
  private dialogService = inject(DialogService);
  
  value: string | undefined;

  campus: string[] = [
    'Campus de Lille',
    'Campus de Lyon',
    'Campus de Bordeaux',
    'Campus de Marseille',
    'Campus de Montpellier',
  ];

  selectedCampus: string | undefined;

  classes: string[] = [
    '1ère année',
    '2ème année',
    '3ème année',
    'Master 1',
    'Master 2',
  ];

  selectedClass: string | undefined;

  newClassDialog: DynamicDialogRef | undefined;

  closeDialog() {
    this.newClassDialog?.close();
  }

  openNewClassDialog() {
    this.newClassDialog = this.dialogService.open(NewClassDialogComponent, {
      width: '80%',
      height: 'fit-content',

      data: {
        id: '51gF3',
      },
      header: 'Étape de configuration de la classe',
    });
    GlobalDialogService.setCurrentDialog(this.newClassDialog);
  }
}
