import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignUpUserDto, SignInUserDto, VerifyOtpDto, RefreshTokenDto } from 'src/dto/index.dto';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('signup')
  signup(@Body() signUpUserDto: SignUpUserDto) {
    return this.authService.signup(signUpUserDto);
  }

  @Post('verify-otp')
  verify_otp(@Body() verifyOtpDto: VerifyOtpDto) {
    return this.authService.verify_otp(verifyOtpDto);
  }

  @Post('signin')
  signin(@Body() signInUserDto: SignInUserDto) {
    return this.authService.signin(signInUserDto);
  }

  @Post('refresh-token')
  refresh_token(@Body() refreshTokenDto: RefreshTokenDto) {
    return this.authService.refresh_token(refreshTokenDto);
  }

  @Get('me')
  getMe() {
    return this.authService.getMe();
  }

  @Get('logout')
  logout() {
    return this.authService.logout();
  }
}
