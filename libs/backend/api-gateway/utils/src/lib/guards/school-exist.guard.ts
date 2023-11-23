import { SchoolService } from '@campuscalendar/backend/api-gateway/data-access';
import { CanActivate, Injectable } from '@nestjs/common';

@Injectable()
export class SchoolExistGuard implements CanActivate {
  constructor(private readonly schoolService: SchoolService) {}

  async canActivate() {
    const isSchoolExist = await this.schoolService.isSchoolConfigured();
    return !isSchoolExist;
  }
}
