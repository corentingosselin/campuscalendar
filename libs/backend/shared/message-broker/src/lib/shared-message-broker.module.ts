import { DynamicModule, Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { MessageBrokerService } from './message-broker.service';

interface MessageBrokerOptions {
  name: string;
}

@Module({
  controllers: [],
  providers: [MessageBrokerService],
  exports: [MessageBrokerService],
})
export class SharedMessageBrokerModule {
  static registerClient({ name }: MessageBrokerOptions): DynamicModule {
    return {
      module: SharedMessageBrokerModule,
      imports: [
        ClientsModule.registerAsync([
          {
            name: name,
            useFactory: (configService: ConfigService) => {
              const uri = configService.get<string>('MESSAGE_BROKER_URI');
              if (!uri) throw new Error('MESSAGE_BROKER_URI is not defined');
              return {
                transport: Transport.RMQ,
                options: {
                  urls: [uri],
                  queue: configService.get<string>(`MB_${name}_QUEUE`),
                  durable: false,
                },
              };
            },
            inject: [ConfigService],
          },
        ]),
      ],
      exports: [ClientsModule],
    };
  }
}
