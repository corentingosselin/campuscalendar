import { Entity } from './entity.interface';

export interface Administrator extends Entity {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

export interface JwtUserSession {
  sub: string;
  email: string;
  exp?: number;
  iat?: number;
}
