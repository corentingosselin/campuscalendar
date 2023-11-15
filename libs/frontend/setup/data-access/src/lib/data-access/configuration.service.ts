import { Injectable } from '@angular/core';
import {
  AdminDto,
  SchoolDto,
  SetupDto,
} from '@campuscalendar/shared/api-interfaces';

@Injectable({ providedIn: 'root' })
export class ConfigurationService {
  private setupDto: SetupDto = {};
  updatePersonalInfo(data: AdminDto) {
    this.setupDto.admin = data;
  }

  updateSchoolInfo(data: SchoolDto) {
    this.setupDto.school = data;
  }

  updateCampusInfo(data: string[]) {
    this.setupDto.campus = data;
  }

  getConfigurationData() {
    return this.setupDto;
  }
}
