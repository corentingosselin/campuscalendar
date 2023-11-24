import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { SchoolResponse } from '@campuscalendar/shared/api-interfaces';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  private http = inject(HttpClient);

  isSchoolExist() {
    return this.http.get<boolean>('/api/school/exists');
  }

  fetchSchool() {
    return this.http.get<SchoolResponse>('/api/school');
  }
}
