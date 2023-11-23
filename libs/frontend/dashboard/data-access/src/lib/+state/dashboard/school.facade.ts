import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { NewClassDialogState } from './school.state';

@Injectable({ providedIn: 'root' })
export class CampusFacade {

  @Select(NewClassDialogState) newClassState$:
    | Observable<DialogStateModel>
    | undefined;

  private store = inject(Store);


}
