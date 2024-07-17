import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from '../entities/index.entity';
import { CreateReviewDto, UpdateReviewDto } from 'src/dto/index.dto';

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(Review) private readonly reviewModel: typeof Review,
  ) {}

  async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
    return await this.reviewModel.create(createReviewDto);
  }

  async findAll(): Promise<any> {
    return await this.reviewModel.findAll({ include: { all: true } });
  }

  async findOne(id: string): Promise<any> {
    const review = await this.reviewModel.findOne({
      include: { all: true },
      where: { id },
    });
    return review;
  }

  async update(id: string, updateData: UpdateReviewDto): Promise<any> {
    try {
      const review = await this.reviewModel.findOne({ where: { id } });
      if (!review) return false;

      await review.update(updateData);
      return review;
    } catch (error) {
      console.error(error);
      return false;
    }
  }

  async delete(id: string): Promise<any> {
    const review = await this.reviewModel.findByPk(id);
    await review.destroy();
  }
}
