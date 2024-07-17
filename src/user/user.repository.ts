import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Otp, RefreshToken, User } from '../entities/index.entity';
import { Op } from 'sequelize';
import { SignUpUserDto } from 'src/dto/index.dto';


@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Otp) private readonly otpModel: typeof Otp,
    @InjectModel(RefreshToken) private readonly refreshModel: typeof RefreshToken,
  ) { }


  async create(newUser: SignUpUserDto): Promise<any> {
    return this.userModel.create(newUser);
    //  INSERT INTO users (username, email, password, role) VALUES(username, email, password, role)
  }

  async findOneUserWithEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ where: { email } });
    //  SELECT * FROM users WHERE email = email
  }

  async findOneUserWithUsername(username: string): Promise<any> {
    return await this.userModel.findOne({ where: { username } });
    //  SELECT * FROM users WHERE username = username
  }

  async findOneUserWithOr(username: string, email: string): Promise<any> {
    return await this.userModel.findOne({ where: { [Op.or]: { username, email } } });
    //  SELECT * FROM users WHERE username = username OR email = email
  }

  async findOneUserWithAnd(username: string, email: string): Promise<any> {
    return await this.userModel.findOne({ where: { [Op.and]: { username, email } } });
    //  SELECT * FROM users WHERE username = username AND email = email
  }

  async findUserAndUpdateStatus(user_id: string,): Promise<any> {
    const user = await this.userModel.findOne({ where: { id: user_id } });
    return await user.update({ status: 'active' }, { where: { id: user_id } });
    //  UPDATE users status = 'active' WHERE id = id
  }
  
  async findOneOtp(otp: string, user_id: string): Promise<any> {
    return await this.otpModel.findOne({ where: { [Op.and]: { otp, user_id } } });
    //  SELECT * FROM otps WHERE otp = otp AND user_id = user_id
  }

  async createOtp(otp: string, user_id: string): Promise<any> {
    return this.otpModel.create({ otp, user_id });
    //  INSERT INTO otps (otp, user_id ) VALUES(otp, user_id )
  }
}



