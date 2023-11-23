import { Action, State, StateContext } from '@ngxs/store';
import { Injectable, inject } from '@angular/core';
import { SchoolModel } from './school.model';
import {
  FetchSchoolInformations,
  SetSchoolInformations,
} from './school.action';
import { SchoolService } from '../../services/school.service';
import { tap } from 'rxjs';

@State<SchoolModel>({
  name: 'school',
  defaults: {
    school: undefined,
  },
})
@Injectable({ providedIn: 'root' })
export class SchoolState {
  private schoolService = inject(SchoolService);

  @Action(FetchSchoolInformations)
  fetchSchoolInfo(ctx: StateContext<SchoolModel>) {
    return this.schoolService.fetchSchool().pipe(
      tap((school) => {
        ctx.dispatch(new SetSchoolInformations(school));
      })
    );
  }

  @Action(SetSchoolInformations)
  setSchoolInfo(ctx: StateContext<SchoolModel>, action: SetSchoolInformations) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      school: action.payload,
    });
  }
}
