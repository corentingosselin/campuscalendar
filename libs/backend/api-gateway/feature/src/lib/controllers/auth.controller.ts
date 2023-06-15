import { AuthService } from '@campuscalendar/backend/api-gateway/data-access';
import { CreateUserDto, LoginUserDto } from '@campuscalendar/shared/api-interfaces';
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
      return this.authService.login(loginUserDto);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
      return this.authService.register(createUserDto);
    }

  }
  