import { AdminResponse, CreateUserDto } from '@campuscalendar/shared/api-interfaces';
import { CreateRequestContext, MikroORM } from '@mikro-orm/core';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AdminEntity } from './entities/admin.entity';

@Injectable()
export class UserService {
  constructor(private readonly orm: MikroORM) {}

  private readonly userRepository = this.orm.em.getRepository(AdminEntity);

  @CreateRequestContext()
  async createUser(createUserDto: CreateUserDto) {
    //check if user already exists
    const userExists = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userExists) {
       throw new RpcException(new BadRequestException('User already exists'));
    }

    const user = new AdminEntity();
    Object.assign(user, createUserDto);
    await this.userRepository.persist(user).flush();
    return user as AdminResponse;
  }

  @CreateRequestContext()
  async getUser(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new RpcException(new NotFoundException(`User  not found`));
    }
    return user as AdminResponse;
  }

  @CreateRequestContext()
  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user as AdminResponse;
  }
}
