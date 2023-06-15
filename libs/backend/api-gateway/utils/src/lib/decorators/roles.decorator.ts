import { UserRole } from '@campuscalendar/shared/api-interfaces';
import { SetMetadata } from '@nestjs/common';

export const Roles = (...roles: UserRole[]) => SetMetadata('roles', roles);
