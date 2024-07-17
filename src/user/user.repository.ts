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
    @InjectModel(RefreshToken)
    private readonly refreshModel: typeof RefreshToken,
  ) {}

  async create(newUser: SignUpUserDto): Promise<any> {
    return await this.userModel.create(newUser);
    //  INSERT INTO users (username, email, password, role) VALUES(username, email, password, role)
  }

  async findOneUserWithEmail(email: string): Promise<any> {
    return await this.userModel.findOne({ where: { email } });
    //  SELECT * FROM users WHERE email = email
  }

  async findByPk(id: string): Promise<any> {
    return await this.userModel.findByPk(id);
    //  SELECT * FROM users WHERE id = id
  }

  async findOneUserWithUsername(username: string): Promise<any> {
    return await this.userModel.findOne({ where: { username } });
    //  SELECT * FROM users WHERE username = username
  }

  async findOneUserWithAnd(username: string, email: string): Promise<any> {
    return await this.userModel.findOne({
      where: { [Op.and]: { username, email } },
    });
    //  SELECT * FROM users WHERE username = username AND email = email
  }

  async findUserAndUpdateStatus(user_id: string): Promise<any> {
    const user = await this.userModel.findOne({ where: { id: user_id } });
    return await user.update({ status: 'active' }, { where: { id: user_id } });
    //  UPDATE users status = 'active' WHERE id = id
  }

  async findOneOtp(otp: string, user_id: string): Promise<any> {
    return await this.otpModel.findOne({
      where: { [Op.and]: { otp, user_id } },
    });
    //  SELECT * FROM otps WHERE otp = otp AND user_id = user_id
  }

  async createOtp(otp: string, user_id: string): Promise<any> {
    return this.otpModel.create({ otp, user_id });
    //  INSERT INTO otps (otp, user_id ) VALUES(otp, user_id )
  }

  async createOrUpdateRefresh(token: {
    refresh: string;
    user_id: string;
  }): Promise<any> {
    const userToken = await this.refreshModel.findOne({
      where: { user_id: token.user_id },
    });

    if (userToken) {
      await userToken.update({ refresh: token.refresh });
      // UPDATE refresh_tokens refresh = refresh WHERE user_id = user_id
      return userToken;
    } else {
      return await this.refreshModel.create(token);
      //  INSERT INTO refresh_tokens (refresh, user_id ) VALUES(refresh, user_id )
    }
  }

  async deleteOtp(id: string): Promise<any> {
    const otp = await this.otpModel.findByPk(id);
    await otp.destroy();
    //  DROP FROM otps WHERE id = id
  }

  async findOneToken(id: string): Promise<any> {
    return await this.refreshModel.findByPk(id);
    //  SELECT * FROM refresh_tokens WHERE id = id
  }

  async findOneTokenAndDelete(user_id: string): Promise<any> {
    const token = await this.refreshModel.findOne({ where: { user_id } });

    await token.destroy();
    //  DELETE FROM refresh_tokens WHERE user_id = user_id
  }
}
