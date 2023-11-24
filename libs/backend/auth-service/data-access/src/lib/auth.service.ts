import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import {
  AdminAccountResponse,
  AdminResponse,
  CreateUserDto,
  JwtUserSession,
  LoginUserDto,
  UserSessionResponse,
} from '@campuscalendar/shared/api-interfaces';

import { RpcService } from '@campuscalendar/backend/shared/network';
import { verify } from 'argon2';
import { USER_SERVICE } from '@campuscalendar/backend/shared/network';
import {
  CREATE_USER_CMD,
  FIND_USER_BY_EMAIL,
} from '@campuscalendar/backend/shared/message-broker';

@Injectable()
export class AuthService {
  private readonly rpcService: RpcService;
  constructor(
    @Inject(USER_SERVICE) private readonly userService: ClientProxy,
    private readonly jwtService: JwtService
  ) {
    this.rpcService = new RpcService(this.userService);
  }

  async validateUser(loginDto: LoginUserDto): Promise<AdminResponse> {
    const user = await this.rpcService.sendWithRpcExceptionHandler<AdminResponse>(
      FIND_USER_BY_EMAIL,
      loginDto.email
    );
    if (!user || !(await verify(user.password, loginDto.password))) {
      throw new RpcException(
        new UnauthorizedException('Invalid email or password.')
      );
    }
    return user;
  }

  async generateJwtToken(user: AdminResponse): Promise<UserSessionResponse> {
    const payload = {
      email: user.email,
      sub: user.id,
    } as JwtUserSession;
    return {
      token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        lastName: user.lastName,
        firstName: user.firstName,
        created_at: user.created_at,
        updated_at: user.updated_at,
      } satisfies AdminAccountResponse,
    } as UserSessionResponse;
  }

  async login(loginDto: LoginUserDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new RpcException(
        new UnauthorizedException('Invalid email or password.')
      );
    }

    return this.generateJwtToken(user);
  }

  async register(registerDto: CreateUserDto) {
    const user: AdminResponse =
      await this.rpcService.sendWithRpcExceptionHandler<AdminResponse>(
        CREATE_USER_CMD,
        registerDto
      );
    return this.generateJwtToken(user);
  }
}
