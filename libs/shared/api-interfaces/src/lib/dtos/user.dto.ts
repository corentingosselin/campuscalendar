import { IsEmail, IsString } from 'class-validator';
import { Administrator } from '../interfaces/user.interface';
import { IsPasswordSecure, Match } from '@campuscalendar/shared/utils';

type DEFAULT_OMIT = 'created_at' | 'updated_at' | 'id';

export class AdminDto implements Omit<Administrator, DEFAULT_OMIT> {
  
  @IsString()
  firstName!: string;

  @IsString()
  lastName!: string;

  @IsEmail()
  @IsString()
  email!: string;

  @IsString()
  @IsPasswordSecure()
  password!: string;

  @IsString()
  @Match('password')
  confirmPassword!: string;
}

