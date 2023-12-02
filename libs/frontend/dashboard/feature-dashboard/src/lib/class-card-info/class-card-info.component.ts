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
import { SchoolService } from '@campuscalendar/dashboard-data-access';
import { t } from '@mikro-orm/core';
import { catchError, tap } from 'rxjs';
@Component({
  selector: 'campuscalendar-class-card-info',
  standalone: true,
  imports: [CommonModule, CardModule, DynamicDialogModule],
  providers: [DialogService],
  templateUrl: './class-card-info.component.html',
  styleUrls: ['./class-card-info.component.scss'],
})
export class ClassCardInfoComponent {
  @Input() classInfo: ClassSchedulerInfo = {} as ClassSchedulerInfo;
  private dialogService = inject(DialogService);
  accountDialogRef?: DynamicDialogRef;

  private schoolService = inject(SchoolService);

  openCard() {
    this.schoolService
      .getClassScheduler(this.classInfo.id)
      .pipe(
        tap((classScheduler) => {
          this.accountDialogRef = this.dialogService.open(
            ClassDialogComponent,
            {
              header:
                classScheduler?.campusName +
                ' - ' +
                classScheduler?.classYearName,
              width: '70%',
              height: '70%',
              data: classScheduler,
            }
          );
          GlobalDialogService.setCurrentDialog(this.accountDialogRef);
        }),
        catchError((error) => {
          console.log(error);
          return error;
        })
      )
      .subscribe();
  }
}
