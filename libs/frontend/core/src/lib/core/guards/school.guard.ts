import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { SchoolService } from '@campuscalendar/school';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SchoolGuard {
  private schoolService = inject(SchoolService);
  private router = inject(Router);

  canActivate() {
    return this.schoolService.isSchoolExist().pipe(
        map((exists) => {
          if (!exists) {
            this.router.navigate(['setup']);
          }
          return exists;
        })
      );
  }
}
