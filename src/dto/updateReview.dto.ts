import { IsEnum, IsNumber, IsString, Length } from 'class-validator';

export class UpdateReviewDto {

    @IsString()
    @IsEnum(['approved', 'pending', 'rejected'])
    status: string;

    @IsNumber()
    @Length(1, 5)
    rating: number;

    @IsString()
    content: string;
}
