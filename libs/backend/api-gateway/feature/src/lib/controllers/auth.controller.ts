import { AuthService } from '@campuscalendar/backend/api-gateway/data-access';
import { LoginUserDto } from '@campuscalendar/shared/api-interfaces';
import {
    Controller,
    Post,
    Body,
  } from '@nestjs/common';

  
  @Controller('auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
  
    @Post('login')
    login(@Body() loginUserDto: LoginUserDto) {
      console.log('test');
      return this.authService.login(loginUserDto);
    }

  }
  