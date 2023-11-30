import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
  inject,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SharedCalendarService } from '@campuscalendar/calendar-data-access';
import { FourOFourComponent } from '@campuscalendar/school';
import {
  ClassScheduler
} from '@campuscalendar/shared/api-interfaces';
import { Observable } from 'rxjs';
import { CalendarFeatureComponent } from '../calendar-feature/calendar-feature.component';

@Component({
  selector: 'campuscalendar-shared-calendar',
  standalone: true,
  imports: [CommonModule, CalendarFeatureComponent, FourOFourComponent],
  templateUrl: './shared-calendar.component.html',
  styleUrls: ['./shared-calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SharedCalendarComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private shareCalendarService = inject(SharedCalendarService);

  classScheduler$?: Observable<ClassScheduler>;

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const hash = params['hash'];
      this.classScheduler$ =
        this.shareCalendarService.getClassSchedulerByHash(hash);
    });
  }
}
