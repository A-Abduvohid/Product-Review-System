import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Product, Review, User } from 'src/entities/index.entity';
import { ReviewRepository } from './review.repository';
import { UserModule } from 'src/user/user.module';
import { ProductModule } from 'src/product/product.module';


@Module({
  imports: [
    SequelizeModule.forFeature([Review, User, Product]),
    UserModule,
    ProductModule,
  ],
  controllers: [ReviewController],
  providers: [ReviewService, ReviewRepository],
  exports: [ReviewService, ReviewRepository],
})
export class ReviewModule {}
