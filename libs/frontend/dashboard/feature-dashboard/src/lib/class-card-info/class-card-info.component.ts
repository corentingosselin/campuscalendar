import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ClassSchedulerInfo } from '@campuscalendar/shared/api-interfaces';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { ClassDialogComponent } from '../class-dialog/class-dialog.component';
import { GlobalDialogService } from '@campuscalendar/dialog';
@Component({
  selector: 'campuscalendar-class-card-info',
  standalone: true,
  imports: [CommonModule,CardModule, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './class-card-info.component.html',
  styleUrls: ['./class-card-info.component.scss'],
})
export class ClassCardInfoComponent {

    @Input() classInfo: ClassSchedulerInfo = {} as ClassSchedulerInfo;
    private dialogService = inject(DialogService);
    accountDialogRef?: DynamicDialogRef;
  

    openCard() {
      this.accountDialogRef = this.dialogService.open(ClassDialogComponent, {
        header: this.classInfo.name,
        width: '70%',
        height: '70%',
        data: this.classInfo,
      });
      GlobalDialogService.setCurrentDialog(this.accountDialogRef);
        
    }


}
