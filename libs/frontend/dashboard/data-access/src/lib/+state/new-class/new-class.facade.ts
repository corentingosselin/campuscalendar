import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { ConfigurationStateModel, DialogStateModel } from './new-class.model';
import { UpdateConfigStep, UpdateStep } from './new-class.action';
import { Observable } from 'rxjs';
import { NewClassDialogState } from './new-class.state';

@Injectable({ providedIn: 'root' })
export class NewClassFacade {

  @Select(NewClassDialogState) newClassState$:
    | Observable<DialogStateModel>
    | undefined;

  private store = inject(Store);

  nextStep() {
    this.store.dispatch(new UpdateStep());
  }

  updateConfigStep(data: ConfigurationStateModel) {
    this.store.dispatch(new UpdateConfigStep(data));
  }
}
