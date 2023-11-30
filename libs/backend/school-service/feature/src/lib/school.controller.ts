import { SchoolService } from '@campuscalendar/backend/school-service/data-access';
import { GET_CLASS_SCHEDULERS_CMD, GET_CLASS_SCHEDULER_CMD, GET_SCHOOL_CMD, GET_SHARED_CALENDAR_BY_HASH_CMD, GET_SHARED_CALENDAR_CMD, IS_SCHOOL_CONFIGURED_CMD, REGISTER_CLASS_SCHEDULER_CMD, REGISTER_SCHOOL_CMD, SHARE_CALENDAR_CMD, TOGGLE_SHARED_CALENDAR_CMD, UPDATE_HASH_SHARED_CALENDAR_CMD } from '@campuscalendar/backend/shared/message-broker';
import { ClassSchedulerDto, SchoolConfigurationDto } from '@campuscalendar/shared/api-interfaces';
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

  @MessagePattern(REGISTER_CLASS_SCHEDULER_CMD)
  registerClassScheduler(@Payload() classSchedulerDto: ClassSchedulerDto) {
    return this.schoolService.registerClassScheduler(classSchedulerDto);
  }

  @MessagePattern(GET_CLASS_SCHEDULERS_CMD)
  getClassSchedulers() {
    return this.schoolService.getClassSchedulers();
  }

  @MessagePattern(GET_CLASS_SCHEDULER_CMD)
  getClassScheduler(@Payload() id: string) {
    return this.schoolService.getClassScheduler(id);
  }

  @MessagePattern(SHARE_CALENDAR_CMD)
  shareCalendar(@Payload() id: string) {
    return this.schoolService.getClassScheduler(id);
  }

  @MessagePattern(GET_SHARED_CALENDAR_CMD)
  getSharedCalendar(id: string) {
    return this.schoolService.getSharedCalendar(id);
  }

  @MessagePattern(TOGGLE_SHARED_CALENDAR_CMD)
  toggleSharedCalendar(id: string) {
    return this.schoolService.toggleSharedCalendar(id);
  }

  @MessagePattern(UPDATE_HASH_SHARED_CALENDAR_CMD)
  updateHashSharedCalendar(id: string) {
    return this.schoolService.generateNewHash(id);
  }

  // no admin role needed
  @MessagePattern(GET_SHARED_CALENDAR_BY_HASH_CMD)
  getSharedCalendarByHash(hash: string) {
    return this.schoolService.getSharedCalendarByHash(hash);
  }

}
