import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ClassSchedulerDto, ClassSchedulerResponse, SchoolResponse } from '@campuscalendar/shared/api-interfaces';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  private http = inject(HttpClient);

  isSchoolExist() {
    return this.http.get<boolean>('/api/school/exists');
  }

  fetchSchool() {
    return this.http.get<SchoolResponse>('/api/school');
  }

  registerClassScheduler(classScheduler: ClassSchedulerDto) {
    return this.http.post<ClassSchedulerResponse>('/api/school/class-scheduler', classScheduler);
  }
}
