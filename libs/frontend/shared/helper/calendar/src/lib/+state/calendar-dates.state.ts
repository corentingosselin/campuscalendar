import { Action, State, StateContext } from '@ngxs/store';
import { HolidaysModel } from './calendar-dates.model';
import { FetchHolidays, SetHolidays } from './calendar-dates.action';
import { HolidayService } from '../holiday.service';
import { Injectable, inject } from '@angular/core';
import { tap } from 'rxjs';


@State<HolidaysModel>({
  name: 'CalendarDatesState',
  defaults: {
    holidays: [],
  },
})
@Injectable({ providedIn: 'root' })
export class CalendarDatesState {

  private holidayService = inject(HolidayService);


  @Action(FetchHolidays)
  fetchHolidays(ctx: StateContext<HolidaysModel>) {
    // Return the observable here. NGXS handles the subscription.
    return this.holidayService.fetchHolidays().pipe(
      tap(holidays => {
        ctx.dispatch(new SetHolidays(holidays));
      })
    );
  }


  @Action(SetHolidays)
  setHolidays(ctx: StateContext<HolidaysModel>, action: SetHolidays) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      holidays: action.payload,
    });
  }
}
