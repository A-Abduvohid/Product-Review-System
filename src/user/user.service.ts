import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';


@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository){ }

  async create(createUserDto: any) {
    return 'This action adds a new user';
  }

  async findAll() {
    return `This action returns all user`;
  }

  async findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  async update(id: number, updateUserDto: any) {
    return `This action updates a #${id} user`;
  }

  async remove(id: number) {
    return `This action removes a #${id} user`;
  }
}




  