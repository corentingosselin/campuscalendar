import { Action, State, StateContext } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SchoolModel } from './school.model';
import { FetchSchoolInformations, SetSchoolInformations } from './school.action';

@State<SchoolModel>({
  name: 'campus',
  defaults: {
    school: undefined,
  },
})
@Injectable({ providedIn: 'root' })
export class SchoolState {

  @Action(FetchSchoolInformations)
  fetchHolidays(ctx: StateContext<SchoolModel>) {
    // Return the observable here. NGXS handles the subscription.
    return this.holidayService.fetchHolidays().pipe(
      tap(holidays => {
        ctx.dispatch(new SetSchoolInformations(holidays));
      })
    );
  }


  @Action(SetSchoolInformations)
  setHolidays(ctx: StateContext<SchoolModel>, action: SetSchoolInformations) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      school: action.payload,
    });
  }

}
