import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
  Length,
} from 'class-validator';

export class UpdateReviewDto {
  @IsOptional()
  @IsUUID()
  @IsString()
  user_id: string;

  @IsOptional()
  @IsUUID()
  @IsString()
  product_id: string;

  @IsOptional()
  @IsString()
  @IsEnum(['approved', 'pending', 'rejected'])
  status: string;

  @IsOptional()
  @IsNumber()
  @Length(1, 5)
  rating: number;

  @IsOptional()
  @IsString()
  content: string;
}
