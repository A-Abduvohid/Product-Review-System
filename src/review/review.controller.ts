import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Req,
} from '@nestjs/common';
import { ReviewService } from './review.service';
import { RolesGuard } from 'src/middleware/roleGuard';
import { Role, Roles } from 'src/middleware/roles.decorator';
import { AuthGuard } from 'src/middleware/guard';
import { CreateReviewDto, UpdateReviewDto } from 'src/dto/index.dto';

@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Moderator, Role.Admin, Role.User)
  create(@Body() createReviewDto: CreateReviewDto) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Moderator, Role.Admin, Role.User)
  findAll() {
    return this.reviewService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Moderator, Role.Admin, Role.User)
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Put(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Moderator, Role.Admin)
  update(@Param('id') id: string, @Body() updateReviewDto: UpdateReviewDto) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Moderator, Role.Admin, Role.User)
  delete(@Param('id') id: string, @Req() request: Request) {
    return this.reviewService.delete(id, request);
  }
}
