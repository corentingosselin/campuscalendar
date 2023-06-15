import { Module } from '@nestjs/common';
import { UserEntity } from './entities/user.entity';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { UserService } from './user.service';

@Module({
    controllers: [],
    providers: [
      UserService
    ],
    exports: [
      UserService
    ],
    imports: [
      MikroOrmModule.forFeature([UserEntity])

    ],
  })
export class UserServiceDataAccessModule {}
