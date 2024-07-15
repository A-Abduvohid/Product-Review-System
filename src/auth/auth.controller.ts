import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signup(@Body() createUserDto: any) {
    return this.authService.signup(createUserDto);
  }

  @Post('verify-otp')
  verify_otp(@Body() createUserDto: any) {
    return this.authService.verify_otp(createUserDto);
  }

  @Post('signin')
  signin(@Body() createUserDto: any) {
    return this.authService.signin(createUserDto);
  }

  @Post('refresh-token')
  refresh_token(@Body() createUserDto: any) {
    return this.authService.refresh_token(createUserDto);
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
