import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SidebarModule } from 'primeng/sidebar';
import { AccountDialogComponent } from './account-dialog/account-dialog.component';
import { GlobalDialogService } from '@campuscalendar/dialog';
import { SchoolFacade } from '@campuscalendar/school';

@Component({
  selector: 'campuscalendar-feature-dashboard',
  standalone: true,
  providers: [DialogService],
  imports: [
    CommonModule,
    AvatarModule,
    ButtonModule,
    DividerModule,
    RouterModule,
    SidebarModule,
    DynamicDialogModule,
  ],
  templateUrl: './feature-dashboard.component.html',
  styleUrls: ['./feature-dashboard.component.scss'],
})
export class FeatureDashboardComponent implements OnInit {
  sidebarVisible = false;
  private dialogService = inject(DialogService);
  accountDialogRef?: DynamicDialogRef;

  private schoolFacade = inject(SchoolFacade);
  ngOnInit(): void {
    this.schoolFacade.fetchSchoolInfo();
      
  }

  showAccountDialog() {
    this.accountDialogRef = this.dialogService.open(AccountDialogComponent, {
      header: 'Mon compte administrateur',
      width: '70%',
      contentStyle: { 'max-height': '500px', overflow: 'auto' },
    });
    GlobalDialogService.setCurrentDialog(this.accountDialogRef);
  }
}
