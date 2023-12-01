import {
  CREATE_USER_CMD,
  DELETE_CLASS_SCHEDULER_CMD,
  DUPLICATE_CLASS_SCHEDULER_CMD,
  GET_CLASS_SCHEDULERS_CMD,
  GET_CLASS_SCHEDULER_CMD,
  GET_SCHOOL_CMD,
  GET_SHARED_CALENDAR_BY_HASH_CMD,
  GET_SHARED_CALENDAR_CMD,
  IS_SCHOOL_CONFIGURED_CMD,
  REGISTER_CLASS_SCHEDULER_CMD,
  REGISTER_SCHOOL_CMD,
  SHARE_CALENDAR_CMD,
  TOGGLE_SHARED_CALENDAR_CMD,
  UPDATE_HASH_SHARED_CALENDAR_CMD,
} from '@campuscalendar/backend/shared/message-broker';
import {
  AUTH_SERVICE,
  RpcService,
  SCHOOL_SERVICE,
} from '@campuscalendar/backend/shared/network';
import {
  ClassSchedulerDto,
  ClassSchedulerInfoResponse,
  ClassSchedulerResponse,
  DuplicateClassSchedulerDto,
  SchoolConfigurationDto,
  SchoolResponse,
  SetupSchoolDto,
  SharedCalendarResonse,
  UserSessionResponse,
} from '@campuscalendar/shared/api-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class SchoolService {
  private readonly rpcService: RpcService;
  private readonly rpcAuthService: RpcService;
  constructor(
    @Inject(SCHOOL_SERVICE) private readonly schoolService: ClientProxy,
    @Inject(AUTH_SERVICE) private readonly authService: ClientProxy
  ) {
    this.rpcService = new RpcService(this.schoolService);
    this.rpcAuthService = new RpcService(this.authService);
  }

  getSchool() {
    return this.rpcService.sendWithRpcExceptionHandler<SchoolResponse>(
      GET_SCHOOL_CMD
    );
  }

  isSchoolConfigured() {
    return this.rpcService.sendWithRpcExceptionHandler<boolean>(
      IS_SCHOOL_CONFIGURED_CMD
    );
  }

  async registerConfiguration(setupDto: SetupSchoolDto) {
    const schoolConfiguration = {
      school: setupDto.school,
      campus: setupDto.campus,
    } as SchoolConfigurationDto;

    const sessionResponse =
      await this.rpcAuthService.sendWithRpcExceptionHandler<UserSessionResponse>(
        CREATE_USER_CMD,
        setupDto.admin
      );

    const registerSchoolResult =
      await this.rpcService.sendWithRpcExceptionHandler<boolean>(
        REGISTER_SCHOOL_CMD,
        schoolConfiguration
      );

    if (!registerSchoolResult) {
      throw new Error('School could not be registered');
    }
    return sessionResponse;
  }

  createClassScheduler(classScheduler: ClassSchedulerDto) {
    return this.rpcService.sendWithRpcExceptionHandler<ClassSchedulerResponse>(
      REGISTER_CLASS_SCHEDULER_CMD,
      classScheduler
    );
  }

  getClassSchedulers() {
    return this.rpcService.sendWithRpcExceptionHandler<ClassSchedulerResponse[]>(
      GET_CLASS_SCHEDULERS_CMD
    );
  }

  getClassScheduler(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<ClassSchedulerResponse>(
      GET_CLASS_SCHEDULER_CMD,
      id
    );
  }

  shareCalendar(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<SharedCalendarResonse>(
      SHARE_CALENDAR_CMD,
      id
    );
  }

  getSharedCalendar(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<SharedCalendarResonse>(
      GET_SHARED_CALENDAR_CMD,
      id
    );
  }

  toggleSharedCalendar(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<SharedCalendarResonse>(
      TOGGLE_SHARED_CALENDAR_CMD,
      id
    );
  }

  generateSharedCalendarNewHash(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<SharedCalendarResonse>(
      UPDATE_HASH_SHARED_CALENDAR_CMD,
      id
    );
  }

  getSharedCalendarByHash(hash: string) {
    return this.rpcService.sendWithRpcExceptionHandler<ClassSchedulerResponse>(
      GET_SHARED_CALENDAR_BY_HASH_CMD,
      hash
    );
  }

  deleteClassScheduler(id: string) {
    return this.rpcService.sendWithRpcExceptionHandler<boolean>(
      DELETE_CLASS_SCHEDULER_CMD,
      id
    );
  }

  duplicateClassScheduler(duplicateDto: DuplicateClassSchedulerDto) {
    return this.rpcService.sendWithRpcExceptionHandler<ClassSchedulerInfoResponse>(
      DUPLICATE_CLASS_SCHEDULER_CMD,
      duplicateDto
    );
  }
}
