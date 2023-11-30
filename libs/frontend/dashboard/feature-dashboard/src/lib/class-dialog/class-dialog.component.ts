import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { CalendarFeatureComponent } from '@campuscalendar/calendar-feature';
import { SchoolService } from '@campuscalendar/dashboard-data-access';
import {
  ClassSchedulerInfo,
  ClassSchedulerResponse,
} from '@campuscalendar/shared/api-interfaces';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { TabViewModule } from 'primeng/tabview';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { Observable } from 'rxjs';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'campuscalendar-class-dialog',
  standalone: true,
  imports: [
    CommonModule,
    TabViewModule,
    ToolbarModule,
    ButtonModule,
    DividerModule,
    CalendarFeatureComponent,
    TooltipModule,
    CardModule,
    InputSwitchModule,
    FormsModule,
  ],
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassDialogComponent implements OnInit {
  private ref = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);
  private schoolService = inject(SchoolService);

  @ViewChild(CalendarFeatureComponent)
  calendarFeatureComponent?: CalendarFeatureComponent;

  classInfo?: ClassSchedulerInfo = undefined;
  classScheduler$?: Observable<ClassSchedulerResponse>;

  ngOnInit() {
    this.classInfo = this.dialogConfig.data;
    if (!this.classInfo?.id) {
      this.ref.close();
      return;
    }
    this.classScheduler$ = this.schoolService.getClassScheduler(
      this.classInfo.id
    );
  }

  handleTabChange(event: any) {
    const index = event.index;
    if (index === 1) {
      this.calendarFeatureComponent?.refreshCalendar();
    }
  }

  isEnabled = false;
  link = 'https://example.com';

  copyLink(): void {
    if (!this.isEnabled) {
      return;
    }

    navigator.clipboard
      .writeText(this.link)
      .then(() => {
        // Handle successful copy
        console.log('Link copied to clipboard!');
      })
      .catch((err) => {
        // Handle copy error
        console.error('Error copying link:', err);
      });
  }
}
