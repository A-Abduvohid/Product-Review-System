import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { ReviewService } from './review.service';
import { RolesGuard } from 'src/middleware/roleGuard';
import { Role, Roles } from 'src/middleware/roles.decorator';
import { AuthGuard } from 'src/middleware/guard';
import { Request, request } from 'express';


@Controller('reviews')
export class ReviewController {
  constructor(private readonly reviewService: ReviewService) {}

  @Post()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Moderator, Role.Admin, Role.User)
  create(@Body() createReviewDto: any) {
    return this.reviewService.create(createReviewDto);
  }

  @Get()
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Moderator, Role.Admin, Role.User)
  findAll(@Req() request: Request) {
    return this.reviewService.findAll(request);
  }

  @Get(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Moderator, Role.Admin, Role.User)
  findOne(@Param('id') id: string) {
    return this.reviewService.findOne(id);
  }

  @Patch(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Moderator, Role.Admin, Role.User)
  update(@Param('id') id: string, @Body() updateReviewDto: any) {
    return this.reviewService.update(id, updateReviewDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard, RolesGuard)
  @Roles(Role.Moderator, Role.Admin, Role.User)
  delete(@Param('id') id: string) {
    return this.reviewService.delete(id);
  }
}
