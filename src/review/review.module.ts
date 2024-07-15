import { Module } from '@nestjs/common';
import { ReviewService } from './review.service';
import { ReviewController } from './review.controller';


@Module({
  imports:[],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
