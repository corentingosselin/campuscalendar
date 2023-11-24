import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, throwError, timeout } from 'rxjs';


const TIMEOUT_DURATION = 5000; // 5 seconds

@Injectable()
export class RpcService {
  private client: ClientProxy;

  constructor(client: ClientProxy) {
    this.client = client;
  }

  sendWithRpcExceptionHandler<T>(
    command: string,
    payload?: unknown
  ): Promise<T> {
    // send 0 data if not payload, small trick to allow passing empty payload
    const result = lastValueFrom(this.client.send(command, payload || 0).pipe(
      timeout(TIMEOUT_DURATION),
      catchError((error) => {
        return throwError(() => new RpcException(error));
      }))
    );
    return result;
  }
  
}
