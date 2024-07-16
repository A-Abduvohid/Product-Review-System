import { IsDecimal, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @Length(5, 20)
    name: string;

    @IsString()
    @IsNotEmpty()
    description: string;

    @IsString()
    @IsNotEmpty()
    category: string;

    @IsNotEmpty()
    @IsDecimal()
    price: number;
}