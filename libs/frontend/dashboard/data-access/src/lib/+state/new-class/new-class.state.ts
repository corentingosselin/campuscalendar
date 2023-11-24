import { Action, State, StateContext } from '@ngxs/store';
import { DialogStateModel } from './new-class.model';
import { UpdateAvailableDatesStep, UpdateConfigStep, UpdateStep, UpdateSubjectTimeStep, UpdateSubjectsStep } from './new-class.action';
import { Injectable } from '@angular/core';

@State<DialogStateModel>({
  name: 'dialog',
  defaults: {
    currentStep: 0,
    config: {
      name: '',
      startDate: undefined,
      endDate: undefined,
      year: undefined,
      campus: undefined,
    },
    subjects: [],
    availableDates: [],
    subjectTimes: [],
    hoursPerDay: 0,
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

  @Action(UpdateAvailableDatesStep)
  updateStepThree(
    ctx: StateContext<DialogStateModel>,
    action: UpdateAvailableDatesStep
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      availableDates: action.payload,
    });
  }

  @Action(UpdateSubjectTimeStep)
  updateStepFour(
    ctx: StateContext<DialogStateModel>,
    action: UpdateSubjectTimeStep
  ) {
    const state = ctx.getState();
    ctx.setState({
      ...state,
      subjectTimes: action.payload.subjectTimes,
      hoursPerDay: action.payload.hoursPerDay,
    });
  }



}
