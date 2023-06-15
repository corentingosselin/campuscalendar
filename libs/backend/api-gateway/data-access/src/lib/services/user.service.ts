import { CREATE_USER_CMD, GET_USER_CMD } from '@campuscalendar/backend/shared/message-broker';
import { RpcService, USER_SERVICE } from '@campuscalendar/backend/shared/network';
import { CreateUserDto, UserAccountResponse, UserResponse } from '@campuscalendar/shared/api-interfaces';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { IService } from '../service.interface';



@Injectable()
export class UserService implements IService<UserAccountResponse, CreateUserDto> {
  private readonly rpcService: RpcService;
  constructor(@Inject(USER_SERVICE) private readonly userService: ClientProxy) {
    this.rpcService = new RpcService(this.userService);
  }

  create(createUserDto: CreateUserDto) {
    return this.rpcService.sendWithRpcExceptionHandler<UserAccountResponse>(
      CREATE_USER_CMD,
      createUserDto
    );
  }

  async findOne(id: string) {
    const userReponse = await this.rpcService.sendWithRpcExceptionHandler<UserResponse>(
      GET_USER_CMD,
      id
    );
    return userReponse as UserAccountResponse;
  }

  async hasOwnership(id: string | number, ownerId: string | number): Promise<boolean> {
    const user = await this.findOne(id as string);
    return user.id === ownerId;
  }
}
