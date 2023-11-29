import { Injectable, inject } from '@angular/core';
import { ClassScheduler } from '@campuscalendar/shared/api-interfaces';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import {
  AddClassScheduler,
  RemoveClassScheduler,
} from './class-scheduler.action';
import { ClassSchedulerState } from './class-scheduler.state';

@Injectable({ providedIn: 'root' })
export class ClassSchedulerFacade {
  @Select(ClassSchedulerState) classState$:
    | Observable<ClassScheduler[]>
    | undefined;

  private store = inject(Store);

  addClass(classScheduler: ClassScheduler) {
    this.store.dispatch(new AddClassScheduler(classScheduler));
  }

  removeClass(id: string) {
    this.store.dispatch(new RemoveClassScheduler(id));
  }
}
