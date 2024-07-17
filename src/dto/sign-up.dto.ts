import { IsEmail, IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignUpUserDto {
  @IsNotEmpty()
  @IsString()
  @Length(5, 15)
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  password: string;

  @IsEnum(['user', 'admin', 'moderator'])
  @IsString()
  role: string;
}

export class UpdateUserDto {

  @IsString()
  @Length(5, 15)
  username: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 12)
  password: string;

  @IsEnum(['user', 'admin', 'moderator'])
  @IsString()
  role: string;
}
