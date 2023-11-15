import { IsEmail, IsString } from 'class-validator';
import { Administrator } from '../interfaces/user.interface';

type DEFAULT_OMIT =
  | 'created_at'
  | 'updated_at'
  | 'id'
  | 'confirmPassword'
  | 'lastName'
  | 'firstName'
  | 'role';

export class LoginUserDto implements Omit<Administrator, DEFAULT_OMIT> {
  @IsEmail()
  email!: string;
  @IsString()
  password!: string;
}
