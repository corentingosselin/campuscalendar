import { Module } from '@nestjs/common';
import { AdminEntity } from './entities/admin.entity';
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
      MikroOrmModule.forFeature([AdminEntity])

    ],
  })
export class UserServiceDataAccessModule {}
