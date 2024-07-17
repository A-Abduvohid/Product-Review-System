import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { UserRepository } from 'src/user/user.repository';
import { ProductRepository } from 'src/product/product.repository';
import { CreateReviewDto } from 'src/dto/createReview.dto';
import { UpdateReviewDto } from 'src/dto/updateReview.dto';
import { InjectModel } from '@nestjs/sequelize';
import { User } from 'src/entities/user.entity';
import { Review } from 'src/entities/review.entity';

@Injectable()
export class ReviewService {
  constructor(
    @InjectModel(User) private readonly userModel: typeof User,
    @InjectModel(Review) private readonly reviewModel: typeof Review,
    private readonly reviewRepository: ReviewRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<any> {
    try {
      const { product_id, user_id } = createReviewDto;

      const existUser = await this.userRepository.findByPk(user_id);

      const existProduct = await this.productRepository.findOne(product_id);

      if (!existUser || !existProduct) {
        return new HttpException(
          'User or Product Not Found',
          HttpStatus.NOT_FOUND,
        );
      }
      const newReview = await this.reviewRepository.createReview({
        ...createReviewDto,
        user_id: existUser.id,
        product_id: existProduct.id,
      });

      return {
        id: newReview.id,
        message: 'Successfully created',
        statusCode: 201,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(request: any): Promise<any> {
    try {
      const allReviews = await this.reviewModel.findAll({
        include: { all: true },
      });

      if (!allReviews) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return allReviews;
      
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
      return;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateReviewDto: UpdateReviewDto): Promise<any> {
    try {
      return;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
