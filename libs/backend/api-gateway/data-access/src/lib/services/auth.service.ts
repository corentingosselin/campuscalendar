import { LOGIN_CMD } from '@campuscalendar/backend/shared/message-broker';
import { AUTH_SERVICE, RpcService } from '@campuscalendar/backend/shared/network';
import { LoginUserDto, UserSessionResponse } from '@campuscalendar/shared/api-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';


@Injectable()
export class AuthService {
  private readonly rpcService: RpcService;

  constructor(
    @Inject(AUTH_SERVICE) private readonly authentificationService: ClientProxy
  ) {
    this.rpcService = new RpcService(this.authentificationService);
  }

  login(loginDto: LoginUserDto) {
    return this.rpcService.sendWithRpcExceptionHandler<UserSessionResponse>(
      LOGIN_CMD,
      loginDto
    );
  }

}
