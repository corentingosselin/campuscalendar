import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  ClassSchedulerDto,
  ClassSchedulerInfo,
  ClassSchedulerInfoResponse,
  ClassSchedulerResponse,
  DuplicateClassSchedulerDto,
  SharedCalendarResonse,
} from '@campuscalendar/shared/api-interfaces';

@Injectable({ providedIn: 'root' })
export class SchoolService {
  private http = inject(HttpClient);

  registerClassScheduler(classScheduler: ClassSchedulerDto) {
    return this.http.post<ClassSchedulerInfoResponse>(
      '/api/school/class-scheduler',
      classScheduler
    );
  }

  fetchClassSchedulers() {
    return this.http.get<ClassSchedulerInfo[]>('/api/school/class-scheduler');
  }

  getClassScheduler(id: string) {
    return this.http.get<ClassSchedulerResponse>(
      `/api/school/class-scheduler/${id}`
    );
  }

  getSharedCalendar(id: string) {
    return this.http.get<SharedCalendarResonse>(
      `/api/school/share/${id}`
    );
  }

  toggleShareCalendar(id: string) {
    return this.http.post<SharedCalendarResonse>(
      `/api/school/share/${id}/toggle`,
      {}
    );
  }

  generateNewSharedCalendarHash(id: string) {
    return this.http.post<SharedCalendarResonse>(
      `/api/school/share/${id}/new-hash`,
      {}
    );
  }

  deleteClassScheduler(id: string) {
    return this.http.delete<boolean>(`/api/school/class-scheduler/${id}`);
  }

  duplicateClassScheduler(duplicateDto: DuplicateClassSchedulerDto) {
    return this.http.post<ClassSchedulerInfoResponse>('api/school/class-scheduler/duplicate', duplicateDto);
  }
}
