import { Injectable, inject } from '@angular/core';
import { ClassSchedulerInfo } from '@campuscalendar/shared/api-interfaces';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AddClassScheduler,
  FetchClassScheduler,
  RemoveClassScheduler,
} from './class-scheduler.action';
import { ClassSchedulerState } from './class-scheduler.state';

@Injectable({ providedIn: 'root' })
export class ClassSchedulerFacade {
  @Select(ClassSchedulerState) classState$:
    | Observable<ClassSchedulerInfo[]>
    | undefined;

  private store = inject(Store);

  addClass(classScheduler: ClassSchedulerInfo) {
    this.store.dispatch(new AddClassScheduler(classScheduler));
  }

  removeClass(id: string) {
    this.store.dispatch(new RemoveClassScheduler(id));
  }

  fetchClassSchedulers() {
    this.store.dispatch(new FetchClassScheduler());
  }
}
