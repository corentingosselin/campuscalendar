import { CREATE_USER_CMD, FIND_USER_BY_EMAIL, GET_USER_CMD } from '@campuscalendar/backend/shared/message-broker';
import { UserService } from '@campuscalendar/backend/user-service/data-access';
import { CreateUserDto } from '@campuscalendar/shared/api-interfaces';
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';


@Controller()
export class UserController {
  constructor(
    private readonly userService: UserService
  ) {}

  @MessagePattern(CREATE_USER_CMD)
  createUser(@Payload() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @MessagePattern(GET_USER_CMD)
  getUser(@Payload() id: string) {
    return this.userService.getUser(id);
  }

  @MessagePattern(FIND_USER_BY_EMAIL)
  findUserByEmail(@Payload() email: string) {
    return this.userService.findUserByEmail(email);
  }
  
}
