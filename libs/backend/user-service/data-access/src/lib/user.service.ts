import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UserEntity } from './entities/user.entity';
import { CreateUserDto, UserResponse } from '@campuscalendar/shared/api-interfaces';

@Injectable()
export class UserService {
  constructor(private readonly orm: MikroORM) {}

  private readonly userRepository = this.orm.em.getRepository(UserEntity);

  @UseRequestContext()
  async createUser(createUserDto: CreateUserDto) {
    //check if user already exists
    const userExists = await this.userRepository.findOne({
      email: createUserDto.email,
    });
    if (userExists) {
       throw new RpcException(new BadRequestException('User already exists'));
    }

    const user = new UserEntity();
    Object.assign(user, createUserDto);
    await this.userRepository.persist(user).flush();
    return user as UserResponse;
  }

  @UseRequestContext()
  async getUser(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new RpcException(new NotFoundException(`User  not found`));
    }
    return user as UserResponse;
  }

  @UseRequestContext()
  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user as UserResponse;
  }
}
