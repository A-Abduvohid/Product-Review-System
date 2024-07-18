import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User, Otp, RefreshToken } from 'src/entities/index.entity';


@Module({
  imports: [SequelizeModule.forFeature([User, Otp, RefreshToken])],
  controllers: [ UserController ],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService]
})
export class UserModule {}
