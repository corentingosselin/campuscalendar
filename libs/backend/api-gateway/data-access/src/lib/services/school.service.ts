import {
  CREATE_USER_CMD,
  GET_SCHOOL_CMD,
  REGISTER_SCHOOL_CMD,
} from '@campuscalendar/backend/shared/message-broker';
import {
  AUTH_SERVICE,
  RpcService,
  SCHOOL_SERVICE,
} from '@campuscalendar/backend/shared/network';
import {
  SchoolConfigurationDto,
  SchoolResponse,
  SetupSchoolDto,
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
    return this.rpcService.sendWithRpcExceptionHandler<SchoolResponse>(GET_SCHOOL_CMD);
  }

  async registerConfiguration(setupDto: SetupSchoolDto) {
    const schoolConfiguration = {
      school: setupDto.school,
      campus: setupDto.campus,
    } as SchoolConfigurationDto;

    const registerSchoolResult =
      await this.rpcService.sendWithRpcExceptionHandler<boolean>(
        REGISTER_SCHOOL_CMD,
        schoolConfiguration
      );

    if (!registerSchoolResult) {
      throw new Error('School could not be registered');
    }

    const sessionResponse =
      this.rpcAuthService.sendWithRpcExceptionHandler<UserSessionResponse>(
        CREATE_USER_CMD,
        setupDto.admin
      );

    return sessionResponse;
  }
}
