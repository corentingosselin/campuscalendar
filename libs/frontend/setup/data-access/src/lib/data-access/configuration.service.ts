import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import {
  AdminDto,
  SchoolDto,
  SetupSchoolDto,
  UserSessionResponse
} from '@campuscalendar/shared/api-interfaces';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  private http = inject(HttpClient);

  private setupDto: SetupSchoolDto = {
    school: {
      name: '',
      classYears: [],
    },
    campus: [],
    admin: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
    }
  };

  updatePersonalInfo(data: AdminDto) {
    this.setupDto.admin = data;
  }

  updateSchoolInfo(data: SchoolDto) {
    this.setupDto.school = data;
  }

  updateCampusInfo(campus: string[]) {
    const setup = this.setupDto;
    setup.campus = campus;
  }

  getConfigurationData() {
    return this.setupDto;
  }

  registerSchool(schoolDto: SetupSchoolDto) {
    return this.http.post<UserSessionResponse>('/api/school/setup', schoolDto);
  }
}
