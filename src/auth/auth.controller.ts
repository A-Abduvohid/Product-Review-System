import { Controller, Get, Post, Body, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  SignUpUserDto,
  SignInUserDto,
  VerifyOtpDto,
  RefreshTokenDto,
} from 'src/dto/index.dto';
import { AuthGuard } from 'src/middleware/guard';
import { Role, Roles } from 'src/middleware/roles.decorator';
import { RolesGuard } from 'src/middleware/roleGuard';

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


  @Post('refresh-token')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Moderator, Role.Admin)
  refresh_token(
    @Body() refreshTokenDto: RefreshTokenDto,
    @Req() request: Request,
  ) {
    return this.authService.refresh_token(refreshTokenDto, request);
  }


  @Get('me')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Moderator, Role.Admin)
  getMe(@Req() request: Request) {
    return this.authService.getMe(request);
  }

  
  @Get('logout')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.User, Role.Moderator, Role.Admin)
  logout(@Req() request: Request) {
    return this.authService.logout(request);
  }
}
