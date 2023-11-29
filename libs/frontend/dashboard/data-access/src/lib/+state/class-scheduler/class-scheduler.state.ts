import { Injectable, inject } from '@angular/core';
import {
  ClassScheduler,
  ClassSchedulerInfo,
} from '@campuscalendar/shared/api-interfaces';
import { Action, State, StateContext } from '@ngxs/store';
import {
  AddClassScheduler,
  FetchClassScheduler,
  RemoveClassScheduler,
} from './class-scheduler.action';
import { MessageService } from 'primeng/api';
import { SchoolService } from '../../school.service';
import { tap } from 'rxjs';

@State<ClassScheduler[]>({
  name: 'classScheduler',
  defaults: [],
})
@Injectable({ providedIn: 'root' })
export class ClassSchedulerState {
  private messageService = inject(MessageService);
  private schoolService = inject(SchoolService);

  @Action(AddClassScheduler)
  addClassScheduler(
    ctx: StateContext<ClassSchedulerInfo[]>,
    action: AddClassScheduler
  ) {
    const state = ctx.getState();
    ctx.setState([...state, action.payload]);
    this.messageService.add({
      severity: 'success',
      summary: `Classe ${action.payload.name} ajoutée`,
      detail: 'La classe a été ajoutée avec succès',
    });
  }

  @Action(RemoveClassScheduler)
  removeClassScheduler(
    ctx: StateContext<ClassSchedulerInfo[]>,
    action: RemoveClassScheduler
  ) {
    const state = ctx.getState();
    ctx.setState(
      state.filter((classScheduler) => classScheduler.id !== action.id)
    );
  }

  @Action(FetchClassScheduler)
  fetchClassScheduler(ctx: StateContext<ClassSchedulerInfo[]>) {
    return this.schoolService.fetchClassSchedulers().pipe(
      tap((classSchedulers) => {
        ctx.setState(classSchedulers);
      })
    );
  }
}
