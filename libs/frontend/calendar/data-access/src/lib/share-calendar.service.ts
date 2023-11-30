import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ClassSchedulerResponse } from '@campuscalendar/shared/api-interfaces';

@Injectable({ providedIn: 'root' })
export class SharedCalendarService {
  private http = inject(HttpClient);

  getClassSchedulerByHash(hash: string) {
    return this.http.get<ClassSchedulerResponse>(`/api/school/calendar/${hash}`);
  }
}
