import { Injectable } from '@nestjs/common';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { catchError, lastValueFrom, tap, throwError, timeout } from 'rxjs';


const TIMEOUT_DURATION = 10000; // 5 seconds

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
    console.log('payload ', payload);
    // send 0 data if not payload, small trick to allow passing empty payload
    const result = lastValueFrom(this.client.send(command, payload || 0).pipe(
      tap((data) => {
        console.log('data ', data);
        if (data instanceof RpcException) {
          console.log('data ex ', data);
        }
      }),
      timeout(TIMEOUT_DURATION),
      catchError((error) => {
        return throwError(() => new RpcException(error));
      }))
    );
    return result;
  }
  
}
