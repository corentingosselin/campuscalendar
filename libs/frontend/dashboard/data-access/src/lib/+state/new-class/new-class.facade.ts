import { Injectable, inject } from '@angular/core';
import { Subject } from '@campuscalendar/shared/api-interfaces';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateAvailableDatesStep, UpdateConfigStep, UpdateStep, UpdateSubjectTimeStep, UpdateSubjectsStep } from './new-class.action';
import { ConfigurationStateModel, DEFAULT_STATE, DialogStateModel, SubjectTime } from './new-class.model';
import { NewClassDialogState } from './new-class.state';

@Injectable({ providedIn: 'root' })
export class NewClassFacade {

  @Select(NewClassDialogState) newClassState$:
    | Observable<DialogStateModel>
    | undefined ;

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

  updateAvailableDatesStep(dates: Date[]) {
    this.store.dispatch(new UpdateAvailableDatesStep(dates));
  }
  
  updateSubjectTimeStep(data: { subjectTimes: SubjectTime[], hoursPerDay: number }) {
    this.store.dispatch(new UpdateSubjectTimeStep(data));
  }

  reset() {
    const currentState = this.store.snapshot();
    this.store.reset({
      ...currentState,
      dialog: {
       ...DEFAULT_STATE
      }
    });
  }
  



}
