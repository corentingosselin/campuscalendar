import { Injectable } from '@angular/core';
import {
  AdminDto,
  SchoolDto,
  SetupSchoolDto
} from '@campuscalendar/shared/api-interfaces';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
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
}
