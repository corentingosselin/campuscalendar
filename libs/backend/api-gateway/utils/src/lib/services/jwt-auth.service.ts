import { JwtUserSession } from '@campuscalendar/shared/api-interfaces';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthService {
  constructor(private readonly jwtService: JwtService) {}

  async loadToken(authHeader: string) {
    const token = authHeader.split(' ')[1];
    const decoded = (await this.jwtService.verify(token)) as JwtUserSession;
    return decoded;
  }
}
