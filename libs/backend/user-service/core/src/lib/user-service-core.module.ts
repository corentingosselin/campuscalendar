import { Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';

import { UserServiceFeatureModule } from '@campuscalendar/backend/user-service/feature';
import mikroOrmConfig from '../mikro-orm.config';
import { AdminEntity } from '@campuscalendar/backend/user-service/data-access';
import { ConfigService } from '@nestjs/config';

@Module({
  controllers: [],
  providers: [],
  exports: [],
  imports: [
    UserServiceFeatureModule,
    MikroOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const dbPort = configService.get<string>('USER_SERVICE_DB_PORT');
        return {
          registerRequestContext: false,
          debug: true,
          type: 'mysql' as const,
          host: configService.get<string>('USER_SERVICE_MYSQL_HOST'),
          port: dbPort ? parseInt(dbPort) : undefined,
          dbName: configService.get<string>('MYSQL_DATABASE'),
          user: configService.get<string>('MYSQL_USER'),
          password: configService.get<string>('MYSQL_PASSWORD'),
          entities: [AdminEntity],
          migrations: {
            path: 'apps/user-service/migrations',
          },
        };
      },

      inject: [ConfigService],
    }),
  ],
})
export class UserServiceCoreModule {}
