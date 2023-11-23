import { Action, State, StateContext } from '@ngxs/store';
import { DialogStateModel } from './new-class.model';
import { UpdateConfigStep, UpdateStep, UpdateSubjectsStep } from './new-class.action';
import { Injectable } from '@angular/core';

@State<DialogStateModel>({
  name: 'dialog',
  defaults: {
    currentStep: 0,
    config: {
      name: '',
      startDate: undefined,
      endDate: undefined,
      campus: undefined,
      year: undefined,
    },
    subjects: []
  },
})
@Injectable({ providedIn: 'root' })
export class NewClassDialogState {

  @Action(UpdateStep)
  updateStep(
    ctx: StateContext<DialogStateModel>
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      currentStep: state.currentStep + 1,
    });
  }

  @Action(UpdateConfigStep)
  updateStepOne(
    ctx: StateContext<DialogStateModel>,
    action: UpdateConfigStep
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      config: action.payload,
    });
  }

  @Action(UpdateSubjectsStep)
  updateStepTwo(
    ctx: StateContext<DialogStateModel>,
    action: UpdateSubjectsStep
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      subjects: action.payload,
    });
  }


}
