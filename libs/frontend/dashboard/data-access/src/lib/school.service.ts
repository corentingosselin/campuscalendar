import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ClassSchedulerDto,
  ClassSchedulerResponse,
} from '@campuscalendar/shared/api-interfaces';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  private http = inject(HttpClient);

  registerClassScheduler(classScheduler: ClassSchedulerDto) {
    return this.http.post<ClassSchedulerResponse>(
      '/api/school/class-scheduler',
      classScheduler
    );
  }
}
