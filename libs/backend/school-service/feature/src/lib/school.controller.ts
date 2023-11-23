import { SchoolService } from '@campuscalendar/backend/school-service/data-access';
import { GET_SCHOOL_CMD, IS_SCHOOL_CONFIGURED_CMD, REGISTER_SCHOOL_CMD } from '@campuscalendar/backend/shared/message-broker';
import { SchoolConfigurationDto } from '@campuscalendar/shared/api-interfaces';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class SchoolController {
  constructor(private readonly schoolService: SchoolService) {}

  @MessagePattern(REGISTER_SCHOOL_CMD)
  register(@Payload() setupDto: SchoolConfigurationDto) {
    return this.schoolService.registerSchool(setupDto);
  }

  @MessagePattern(GET_SCHOOL_CMD)
  getSchool() {
    return this.schoolService.getSchool();
  }

  @MessagePattern(IS_SCHOOL_CONFIGURED_CMD)
  isSchoolConfigured() {
    return this.schoolService.isSchoolConfigured();
  }
}
