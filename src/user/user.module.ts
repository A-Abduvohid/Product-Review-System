import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from 'src/entities/user.entity';


@Module({
  imports: [SequelizeModule.forFeature([User])],
  controllers: [ UserController ],
  providers: [UserRepository, UserService],
  exports: [UserRepository, UserService, SequelizeModule]
})
export class UserModule {}
