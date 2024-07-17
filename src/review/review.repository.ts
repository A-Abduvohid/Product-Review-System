import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Review } from '../entities/index.entity';
import { CreateReviewDto, UpdateReviewDto } from 'src/dto/index.dto';
// import { Sequelize, QueryTypes } from 'sequelize';

@Injectable()
export class ReviewRepository {
    constructor(
        @InjectModel(Review) private readonly reviewModel: typeof Review,
        // private readonly sequelize: Sequelize,
    ) { }

    async createReview(createReviewDto: CreateReviewDto): Promise<Review> {
        return await this.reviewModel.create(createReviewDto);
    }

    
}
