import { AuthService } from '@campuscalendar/backend/auth-service/data-access';
import { LOGIN_CMD, REGISTER_CMD } from '@campuscalendar/backend/shared/message-broker';
import { CreateUserDto, LoginUserDto } from '@campuscalendar/shared/api-interfaces';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService
  ) {}

  @MessagePattern(REGISTER_CMD)
  register(@Payload() registerDto: CreateUserDto) {
    return this.authService.register(registerDto);
  }

  @MessagePattern(LOGIN_CMD)
  async login(@Payload() loginDto: LoginUserDto) {
    return this.authService.login(loginDto);
  }

}
