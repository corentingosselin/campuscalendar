import { Injectable, inject } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { SchoolState } from './school.state';
import { SchoolModel } from './school.model';
import { FetchSchoolInformations } from './school.action';

@Injectable({ providedIn: 'root' })
export class SchoolFacade {

  @Select(SchoolState) schoolState$:
    | Observable<SchoolModel>
    | undefined;

  private store = inject(Store);

  fetchSchoolInfo() {
    this.store.dispatch(new FetchSchoolInformations());
  }

  


}
