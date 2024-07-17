import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class SignInUserDto {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Length(6, 12)
  password: string;
}
