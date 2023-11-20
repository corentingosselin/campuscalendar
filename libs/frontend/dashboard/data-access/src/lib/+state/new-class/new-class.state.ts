import { Action, State, StateContext } from '@ngxs/store';
import { ConfigurationStateModel, DialogStateModel } from './new-class.model';
import { UpdateConfigStep, UpdateStep } from './new-class.action';

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
  },
})
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


}
