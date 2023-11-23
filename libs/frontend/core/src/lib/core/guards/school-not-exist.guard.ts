import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SchoolNotExistGuard {
  private http = inject(HttpClient);
  private router = inject(Router);

  canActivate() {
    return this.http
      .get<boolean>('api/school/exists').pipe(
        map((exists) => {
          if (exists) {
            this.router.navigate(['']);
          }
          return !exists;
        })
      );
  }
}
