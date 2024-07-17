import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from 'src/user/user.repository';
import { SignUpUserDto, SignInUserDto, VerifyOtpDto, RefreshTokenDto } from 'src/dto/index.dto';
import * as bcrypt from "bcrypt";
import { MailerService } from '@nestjs-modules/mailer';
import otpGenerator from 'otp-generator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

  constructor(private readonly userRepository: UserRepository,
    private readonly mailerService: MailerService,
    private readonly jwtService: JwtService
  ) { }

  async signup(signUpUserDto: SignUpUserDto): Promise<any> {
    try {
      const { password, username, email, role } = signUpUserDto;

      const existUser = await this.userRepository.findOneUserWithEmail(email);

      if (existUser) {
        return new HttpException('User already exists', HttpStatus.NOT_FOUND);
      };

      const existUsername = await this.userRepository.findOneUserWithUsername(username);

      if (existUsername) {
        return new HttpException('Username already exist put another username', HttpStatus.NOT_FOUND);
      };

      const hashedPassword = await bcrypt.hash(password, Number(process.env.BCRYPT_SALT));

      const newUser = await this.userRepository.create({ email, password: hashedPassword, username, role });

      const otp = otpGenerator.generate(6, { specialChars: false, upperCaseAlphabets: false });

      await this.mailerService.sendMail({
        to: email,
        subject: "Your One Time Password ✔",
        html: `<h2>${otp}</h2>`,
      });

      await this.userRepository.createOtp(otp, newUser.id);

      return {
        id: newUser.id, username: newUser.username,
        message: 'Successfully created', statusCode: HttpStatus.CREATED
      };

    } catch (error) {
      console.log(error);

      return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async verify_otp(verifyOtpDto: VerifyOtpDto): Promise<any> {
    try {
      const { user_id, otp } = verifyOtpDto;

      const existOtp = await this.userRepository.findOneOtp(otp, user_id);

      if (!existOtp) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      if (otp !== existOtp.otp) {
        return new HttpException('Your otp is not match', HttpStatus.BAD_REQUEST);
      }

      const updatedUser = await this.userRepository.findUserAndUpdateStatus(user_id);

      const { password, ...rest } = updatedUser;

      return {
        rest,
        statusCode: HttpStatus.OK,
        message: "OTP verified, account activated"
      }

    } catch (error) {
      console.log(error);

      return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }


  async signin(signInUserDto: SignInUserDto): Promise<any> {
    try {
      const { email, password } = signInUserDto;

      const existUser = await this.userRepository.findOneUserWithEmail(email);

      if (!existUser) {
        return new HttpException('Invalid Email', HttpStatus.BAD_REQUEST); 
      }

      if (existUser.status !== 'active') {
        return new HttpException('Your status is not active', HttpStatus.BAD_REQUEST); 
      }

      const checkPassword = await bcrypt.compare(password, existUser.password);

      if (!checkPassword) {
        return new HttpException('Invalid Password', HttpStatus.BAD_REQUEST); 
      }

      const { id, role, username } = existUser;

      const accessToken = this.generateToken({ id, username, email, role }, process.env.ACCESS_TIME);

      const refreshToken = this.generateToken({ id, username, email, role }, process.env.REFRESH_TIME);

      const time = new Date()

      return { accessToken, refreshToken };
    } catch (error) {
      console.log(error);

      return new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }

  }

  generateToken(payload:
    { id: string, username: string, email: string, role: string }, time: string) {
    return this.jwtService.sign(payload, { expiresIn: time });
  }

  async refresh_token(RefreshTokenDto: RefreshTokenDto): Promise<any> {
    try {


      return this.userRepository
    } catch (error) {
      console.log(error);
    }
  }


  getMe(): Promise<any> {
    try {


      return 
    } catch (error) {
      console.log(error);
    }
  }

  logout(): Promise<any> {
    try {


    return 
    } catch (error) {
      console.log(error);
    }
  }
}

