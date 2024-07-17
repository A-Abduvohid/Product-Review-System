import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignUpUserDto,
  SignInUserDto,
  VerifyOtpDto,
  RefreshTokenDto,
} from 'src/dto/index.dto';
import { AuthGuard } from 'src/middleware/guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

  @UseGuards(AuthGuard)
  @Post('refresh-token')
  refresh_token(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Req() request: Request,
  ) {
    return this.authService.refresh_token(refreshTokenDto, request);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getMe(@Req() request: Request) {
    return this.authService.getMe(request);
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  logout(@Req() request: Request) {
    return this.authService.logout(request);
  }
}
