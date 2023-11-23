import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';

import { Observable } from 'rxjs';
import { FetchHolidays } from './calendar-dates.action';
import { HolidaysModel } from './calendar-dates.model';
import { CalendarDatesState } from './calendar-dates.state';

@Injectable({ providedIn: 'root' })
export class CalendarDatesFacade {

  @Select(CalendarDatesState) calendarState$:
    | Observable<HolidaysModel>
    | undefined;

  private store = inject(Store);
  
  initHolidays() {
    this.store.dispatch(new FetchHolidays());
  }
}
