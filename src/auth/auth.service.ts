import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from 'src/user/user.repository';



@Injectable()
export class AuthService {

  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,) { }

  signup(createUserDto: any) {
    return this;
  }


  verify_otp(createUserDto: any) {
    return this;
  }


  signin(createUserDto: any) {
    return this;
    
  }

  refresh_token(createUserDto: any) {
    return this;
    
  }


  getMe() {
    return this;
    
  }

  logout() {
    return this;
    
  }
}

