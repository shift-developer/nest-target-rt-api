import {
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

type Gender = 'Male' | 'Female' | 'Other';

export class SignUpDTO {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  @MaxLength(50)
  @Matches(/(?:(?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'The password must have a Uppercase, lowercase letter and a number',
  })
  password: string;

  @IsIn(['Male', 'Female', 'Other'])
  gender: Gender;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  firstname: string;

  @IsOptional()
  @IsString()
  @MinLength(2)
  @MaxLength(50)
  lastname: string;
}
