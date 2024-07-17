import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ReviewRepository } from './review.repository';
import { UserRepository } from 'src/user/user.repository';
import { ProductRepository } from 'src/product/product.repository';
import { CreateReviewDto, UpdateReviewDto } from 'src/dto/index.dto';

@Injectable()
export class ReviewService {
  constructor(
    private readonly reviewRepository: ReviewRepository,
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
  ) {}

  async create(createReviewDto: CreateReviewDto): Promise<any> {
    try {
      const { product_id, user_id, rating } = createReviewDto;

      const existUser = await this.userRepository.findByPk(user_id);

      const existProduct = await this.productRepository.findOne(product_id);

      if (!existUser || !existProduct) {
        return new HttpException(
          'User or Product Not Found',
          HttpStatus.NOT_FOUND,
        );
      }

      if (typeof rating !== 'number' || rating < 1 || rating > 5) {
        return new HttpException(
          'Rating must be a number between 1 and 5',
          HttpStatus.BAD_REQUEST,
        );
      }
      const newReview = await this.reviewRepository.createReview({
        ...createReviewDto,
        user_id: existUser.id,
        product_id: existProduct.id,
        rating,
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

  async findAll(): Promise<any> {
    try {
      const allReviews = await this.reviewRepository.findAll();

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
      const review = await this.reviewRepository.findOne(id);

      if (!review) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }
      return review;
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
      const { user_id, product_id } = updateReviewDto;

      const existUser = await this.userRepository.findByPk(user_id);

      const existProduct = await this.productRepository.findOne(product_id);

      if (!existProduct || !existUser) {
        return new HttpException(
          'User or Product is not exist',
          HttpStatus.BAD_REQUEST,
        );
      }

      const updatedReview = await this.reviewRepository.update(id, {
        ...updateReviewDto,
        user_id,
        product_id,
      });

      if (!updatedReview) {
        return new HttpException(
          'Something wrong',
          HttpStatus.FAILED_DEPENDENCY,
        );
      }

      return {
        message: 'updated Successfully',
        id: updatedReview.id,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string, request :any): Promise<any> {
    try {
      const existReview = await this.reviewRepository.findOne(id);

      if (!existReview) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      if (request.user.role === 'user' || request.user.role === 'moderator') {
        if (request.user.id === existReview.user_id) {
          await this.reviewRepository.delete(id);
        } else {
          return new HttpException('Unutorized', HttpStatus.UNAUTHORIZED);
        }
      } else {
        await this.reviewRepository.delete(id);
      }

      return {
        message: 'Successfully deleted',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
