import { ExecutionContext, Injectable } from '@nestjs/common';
import { SERVICE_CLASS_KEY } from '../decorators/service-class.decorator';
import { ModuleRef } from '@nestjs/core';
import { IService } from '@campuscalendar/backend/api-gateway/data-access';

@Injectable()
export class ServiceFactory {
  constructor(private moduleRef: ModuleRef) {}

  public getCorrectService(context: ExecutionContext): IService<any> {
    // Get the route handler and retrieve the service class from the metadata
    const handler = context.getHandler();
    const serviceClass = Reflect.getMetadata(SERVICE_CLASS_KEY, handler);

    // Instantiate the service
    if (serviceClass) {
      return this.moduleRef.get(serviceClass, { strict: false });
    } else {
      throw new Error('No appropriate service found');
    }
  }
}
