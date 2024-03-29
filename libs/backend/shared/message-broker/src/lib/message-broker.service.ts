import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RmqContext, RmqOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class MessageBrokerService {
  constructor(private readonly configService: ConfigService) {}

  getOptions(queue: string, noAck = true): RmqOptions {
    const uri = this.configService.get<string>('MESSAGE_BROKER_URI');
    if(!uri) throw new Error('MESSAGE_BROKER_URI is not defined');
    return {
      transport: Transport.RMQ,
      options: {
        urls: [ uri ],
        queue: this.configService.get<string>(`MB_${queue}_QUEUE`),
        noAck,
      },
    };
  }

  ack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.ack(originalMessage);
  }

  nack(context: RmqContext) {
    const channel = context.getChannelRef();
    const originalMessage = context.getMessage();
    channel.nack(originalMessage);
  }
}
