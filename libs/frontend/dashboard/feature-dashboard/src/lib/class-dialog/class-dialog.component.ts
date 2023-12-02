import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  ViewChild,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CalendarFeatureComponent } from '@campuscalendar/calendar-feature';
import {
  ClassSchedulerFacade,
  SchoolService,
} from '@campuscalendar/dashboard-data-access';
import { environment } from '@campuscalendar/environment';
import { ClassSchedulerResponse } from '@campuscalendar/shared/api-interfaces';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DividerModule } from 'primeng/divider';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TooltipModule } from 'primeng/tooltip';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { DuplicateFormComponent } from '../duplicate-form/duplicate-form.component';
import { IcsExporterService } from '@campuscalendar/calendar';

interface SharedCalendarLink {
  link: string;
  enabled: boolean;
}
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
    ToastModule,
    DuplicateFormComponent
  ],
  providers: [MessageService],
  templateUrl: './class-dialog.component.html',
  styleUrls: ['./class-dialog.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClassDialogComponent implements OnInit {
  private ref = inject(DynamicDialogRef);
  private dialogConfig = inject(DynamicDialogConfig);
  private schoolService = inject(SchoolService);
  private classFacade = inject(ClassSchedulerFacade);
  private icsExporterService = inject(IcsExporterService);

  private messageService = inject(MessageService);

  @ViewChild(CalendarFeatureComponent)
  calendarFeatureComponent?: CalendarFeatureComponent;

  classScheduler?: ClassSchedulerResponse;

  sharedCalendar$: BehaviorSubject<SharedCalendarLink> =
    new BehaviorSubject<SharedCalendarLink>({
      link: 'Aucun lien disponible pour le moment',
      enabled: false,
    });

  ngOnInit() {
    this.classScheduler = this.dialogConfig.data;
    if (!this.classScheduler) return;

    this.schoolService
      .getSharedCalendar(this.classScheduler.id)
      .pipe(
        tap((response) => {
          this.sharedCalendar$.next({
            link: `${environment.calendarBaseUrl}/share/${response.hash}`,
            enabled: response.enabled,
          });
        })
      )
      .subscribe();
  }

  handleTabChange(event: any) {
    const index = event.index;
    if (index === 1) {
      this.calendarFeatureComponent?.refreshCalendar();
    }
  }

  copyLink(): void {
    if (!this.sharedCalendar$.value.enabled) {
      return;
    }

    navigator.clipboard
      .writeText(this.sharedCalendar$.value.link)
      .then(() => {
        this.messageService.add({
          severity: 'success',
          summary: 'Lien copié',
          detail: 'Le lien a été copié dans le presse-papier',
        });
      })
      .catch((err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Erreur',
          detail: 'Une erreur est survenue lors de la copie du lien',
        });
      });
  }

  toggleShare() {
    if (!this.classScheduler) {
      return;
    }
    this.schoolService
      .toggleShareCalendar(this.classScheduler.id)
      .pipe(
        tap((response) => {
          this.sharedCalendar$.next({
            link: `${environment.calendarBaseUrl}/share/${response.hash}`,
            enabled: response.enabled,
          });
        })
      )
      .subscribe();
  }

  generateNewHash() {
    if (!this.classScheduler) {
      return;
    }
    this.schoolService
      .generateNewSharedCalendarHash(this.classScheduler.id)
      .pipe(
        tap((response) => {
          this.sharedCalendar$.next({
            link: `${environment.calendarBaseUrl}/share/${response.hash}`,
            enabled: response.enabled,
          });
        })
      )
      .subscribe();
  }

  openUrl(url: string) {
    window.open(url, '_blank');
  }

  deleteClass() {
    if (!this.classScheduler) {
      return;
    }
    this.schoolService
      .deleteClassScheduler(this.classScheduler.id)
      .pipe(
        tap((response) => {
          if (response && this.classScheduler?.id) {
            this.classFacade.removeClass(this.classScheduler.id);
            this.ref.close(response);
          }
        }),
        catchError((err) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Erreur',
            detail: 'Une erreur est survenue lors de la suppression de la classe',
          });
          return err;
        })
      )
      .subscribe();
  }
  
  duplicateFormDisplayed = false;
  toggleDuplicateDisplay(displayed: boolean) {
    this.duplicateFormDisplayed = displayed;
  }

  exportCalendar() {
    if (!this.classScheduler) {
      return;
    }
    const file = this.icsExporterService.export(this.classScheduler);
    const url = URL.createObjectURL(file);
    const link = document.createElement('a');
    link.href = url;
    link.download = file.name;
    link.click();
    URL.revokeObjectURL(url);
  }


}
