import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CalendarDatesFacade } from '@campuscalendar/calendar';

@Component({
  selector: 'campuscalendar-dashboard-core',
  standalone: true,
  imports: [RouterModule],
  template: `
    <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardCoreComponent implements OnInit {

  private calendarFacade = inject(CalendarDatesFacade);

  ngOnInit() {
    this.calendarFacade.initHolidays();
  }
}
