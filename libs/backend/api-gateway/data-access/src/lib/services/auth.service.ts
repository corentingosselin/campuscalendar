import { LOGIN_CMD, REGISTER_CMD } from '@campuscalendar/backend/shared/message-broker';
import { AUTH_SERVICE, RpcService } from '@campuscalendar/backend/shared/network';
import { CreateUserDto, LoginUserDto, UserSessionResponse } from '@campuscalendar/shared/api-interfaces';
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

  async register(registerDto: CreateUserDto) {
    const result =
       await this.rpcService.sendWithRpcExceptionHandler<UserSessionResponse>(
        REGISTER_CMD,
        registerDto
      );
    return result;
  }
}
