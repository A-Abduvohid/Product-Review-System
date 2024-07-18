import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { SignUpUserDto, UpdateUserDto } from 'src/dto/sign-up.dto';
import { MailerService } from '@nestjs-modules/mailer';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly mailService: MailerService,
  ) {}

  async create(createUserDto: SignUpUserDto): Promise<any> {
    try {
      const { password, username, email, role } = createUserDto;

      const existUser = await this.userRepository.findOneUserWithEmail(email);

      if (existUser) {
        return new HttpException('User already exists', HttpStatus.BAD_REQUEST);
      }

      const existUsername =
        await this.userRepository.findOneUserWithUsername(username);

      if (existUsername) {
        return new HttpException(
          'Username already exists, use another username',
          HttpStatus.BAD_REQUEST,
        );
      }

      const hashedPassword = await bcrypt.hash(
        password,
        Number(process.env.BCRYPT_SALT),
      );

      const newUser = await this.userRepository.create({
        email,
        password: hashedPassword,
        username,
        role,
      });

      const otp = Math.floor(Math.random() * 1000000) + '';

      await this.mailService.sendMail({
        to: email,
        subject: 'Your One Time Password ✔',
        html: `<h2>${otp}</h2>`,
      });

      await this.userRepository.createOtp(otp, newUser.id);

      return {
        id: newUser.id,
        username: newUser.username,
        message: 'Successfully created',
        statusCode: HttpStatus.CREATED,
      };
    } catch (error) {
      console.log(error);
      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const allUsers = await this.userRepository.findAll();

      if (!allUsers) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return allUsers;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const user = await this.userRepository.findByPk(id);

      if (!user) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      const { password, ...rest } = user.dataValues;

      return rest;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    try {
      const user = await this.userRepository.findByPk(id);

      if (!user) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      const updatedUser = await this.userRepository.updateUser(
        id,
        updateUserDto,
      );

      if (!updatedUser) {
        return new HttpException(
          'Something wrong',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      const { password, ...rest } = updatedUser.dataValues;

      return rest;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

}
