import { Injectable, inject } from '@angular/core';
import { AdminAccountResponse } from '@campuscalendar/shared/api-interfaces';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { RemoveAccountInformations, SetAccountInformations } from './account.action';
import { AccountState } from './account.state';
import { AccountModel } from './account.model';

@Injectable({ providedIn: 'root' })
export class AccountFacade {

  @Select(AccountState) accountState$:
    | Observable<AccountModel>
    | undefined;

  private store = inject(Store);

  setAccountInfo(account: AdminAccountResponse) {
    this.store.dispatch(new SetAccountInformations(account));
  }

  removeAccountInfo() {
    this.store.dispatch(new RemoveAccountInformations());
  }


}
