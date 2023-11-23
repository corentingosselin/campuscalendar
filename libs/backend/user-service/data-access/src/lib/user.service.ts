import { MikroORM, UseRequestContext } from '@mikro-orm/core';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { AdminEntity } from './entities/admin.entity';
import { AdminResponse, CreateUserDto } from '@campuscalendar/shared/api-interfaces';

@Injectable()
export class UserService {
  constructor(private readonly orm: MikroORM) {}

  private readonly userRepository = this.orm.em.getRepository(AdminEntity);

  @UseRequestContext()
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

  @UseRequestContext()
  async getUser(id: string) {
    const user = await this.userRepository.findOne(id);
    if (!user) {
      throw new RpcException(new NotFoundException(`User  not found`));
    }
    return user as AdminResponse;
  }

  @UseRequestContext()
  async findUserByEmail(email: string) {
    const user = await this.userRepository.findOne({ email });
    return user as AdminResponse;
  }
}
