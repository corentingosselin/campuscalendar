import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtAuthService } from '../services/jwt-auth.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtAuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorizationHeader = request.headers['authorization'];

    if (!authorizationHeader && !authorizationHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Authorization header not found');
    }

    try {
      const decoded = await this.jwtService.loadToken(authorizationHeader);
      request.user = decoded;
      return true;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
