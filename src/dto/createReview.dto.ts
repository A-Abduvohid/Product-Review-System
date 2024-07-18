import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @IsUUID()
  product_id: string;

  @IsNotEmpty()
  @IsString()
  @IsUUID()
  user_id: string;

  @IsNumber()
  @IsNotEmpty()
  rating: number;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsEnum(['approved', 'pending', 'rejected'])
  @IsString()
  status: string;
}
