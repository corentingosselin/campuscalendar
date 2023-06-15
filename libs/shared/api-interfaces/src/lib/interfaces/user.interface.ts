import { Entity } from "./entity.interface";

export interface User extends Entity {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
    role: UserRole;
  }

  export enum UserRole {
    ADMIN = 'ADMIN',
    TEACHER = 'TEACHER',
    STUDENT = 'STUDENT'
  }

  export interface JwtUserSession {
    sub: string;
    email: string;
    exp?: number;
    iat?: number;
    role: UserRole;
  }
  