import { IsEmail, IsString } from 'class-validator';
import { Administrator } from '../interfaces/user.interface';

type DEFAULT_OMIT =
  | 'created_at'
  | 'updated_at'
  | 'id'
  | 'confirmPassword'
  | 'lastName'
  | 'firstName';

export class LoginUserDto implements Omit<Administrator, DEFAULT_OMIT> {
  @IsEmail()
  email!: string;
  @IsString()
  password!: string;
}

export class CreateUserDto implements Omit<Administrator, DEFAULT_OMIT> {
  @IsEmail()
  email!: string;
  @IsString()
  password!: string;
  @IsString()
  firstName!: string;
  @IsString()
  lastName!: string;
  @IsString()
  confirmPassword!: string;
}