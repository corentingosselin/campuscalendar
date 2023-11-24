import { Injectable } from '@angular/core';
import { Action, State, StateContext } from '@ngxs/store';
import { RemoveAccountInformations, SetAccountInformations } from './account.action';
import { AccountModel } from './account.model';


@State<AccountModel>({
  name: 'adminUser',
  defaults: {
    account: undefined,
  },
})
@Injectable({ providedIn: 'root' })
export class AccountState {

  @Action(SetAccountInformations)
  setSchoolInfo(ctx: StateContext<AccountModel>, action: SetAccountInformations) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      account: action.payload,
    });
  }

  @Action(RemoveAccountInformations)
  removeSchoolInfo(ctx: StateContext<AccountModel>) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      account: undefined,
    });
  }
}
