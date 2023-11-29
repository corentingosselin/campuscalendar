import { Injectable, inject } from '@angular/core';
import { ClassScheduler } from '@campuscalendar/shared/api-interfaces';
import { Action, State, StateContext } from '@ngxs/store';
import {
  AddClassScheduler,
  RemoveClassScheduler,
} from './class-scheduler.action';
import { MessageService } from 'primeng/api';

@State<ClassScheduler[]>({
  name: 'classScheduler',
  defaults: [],
})
@Injectable({ providedIn: 'root' })
export class ClassSchedulerState {
  private messageService = inject(MessageService);

  @Action(AddClassScheduler)
  addClassScheduler(
    ctx: StateContext<ClassScheduler[]>,
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
    ctx: StateContext<ClassScheduler[]>,
    action: RemoveClassScheduler
  ) {
    const state = ctx.getState();
    ctx.setState(
      state.filter((classScheduler) => classScheduler.id !== action.id)
    );
  }
}
