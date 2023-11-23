import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateConfigStep, UpdateStep, UpdateSubjectsStep } from './new-class.action';
import { ConfigurationStateModel, DialogStateModel } from './new-class.model';
import { NewClassDialogState } from './new-class.state';
import { Subject } from '@campuscalendar/shared/api-interfaces';

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

  updateSubjectsStep(data: Subject[]) {
    this.store.dispatch(new UpdateSubjectsStep(data));
  }
}
