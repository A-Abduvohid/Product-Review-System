import { IsNotEmpty, IsNumber, IsString, IsUUID, Length } from 'class-validator';

export class CreateReviewDto {
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    productId: string;

    @IsNumber()
    @Length(1, 5)
    @IsNotEmpty()
    rating: number;

    @IsNotEmpty()
    @IsString()
    content: string;
}
