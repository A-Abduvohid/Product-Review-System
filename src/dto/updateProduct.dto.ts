import { IsDecimal, IsString, Length } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @Length(5, 20)
  name: string;

  @IsString()
  description: string;

  @IsString()
  category: string;

  @IsDecimal()
  price: number;
}
