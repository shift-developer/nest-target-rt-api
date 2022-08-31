import {
  IsEmail,
  IsIn,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Gender } from '@users/interfaces/user.interface';
import {
  PASSWORD_REGEX,
  PASSWORD_ERROR,
  AVAILABLE_GENDERS,
} from '@users/constants/user.constants';

export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(PASSWORD_REGEX, {
    message: PASSWORD_ERROR,
  })
  password: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstName: string;

  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastName: string;

  @IsIn(AVAILABLE_GENDERS)
  gender: Gender;
}
