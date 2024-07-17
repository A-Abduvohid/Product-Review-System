import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dto/index.dto';
import { ProductRepository } from './product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  async create(createProductDto: CreateProductDto): Promise<any> {
    try {
      const { price } = createProductDto;

      if (price <= 0) {
        return new HttpException(
          'Price must be positive number',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newProduct = await this.productRepository.createProduct({
        ...createProductDto,
        price,
      });

      return { productId: newProduct.id, message: 'Successfully created' };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(): Promise<any> {
    try {
      const allProducts = await this.productRepository.findAll();

      if (!allProducts) {
        return new HttpException('Not Found', HttpStatus.BAD_REQUEST);
      }

      return allProducts;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<any> {
    try {
      const product = await this.productRepository.findOne(id);

      if (!product) {
        return new HttpException('Not Found', HttpStatus.BAD_REQUEST);
      }

      return product;
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<any> {
    try {
      const { price } = updateProductDto;

      if (price <= 0) {
        return new HttpException(
          'Price must be positive number',
          HttpStatus.BAD_REQUEST,
        );
      }

      const newProduct = { price, ...updateProductDto };

      const updatedProduct = await this.productRepository.update(
        id,
        newProduct,
      );

      if (!updatedProduct) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      return {
        message: 'successfully updated',
        id: updatedProduct,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async delete(id: string): Promise<any> {
    try {
      const existProduct = await this.productRepository.findOne(id);

      if (!existProduct) {
        return new HttpException('Not Found', HttpStatus.NOT_FOUND);
      }

      await this.productRepository.delete(id);

      return {
        message: 'Successfully deleted',
        statusCode: 200,
      };
    } catch (error) {
      console.log(error);

      return new HttpException(
        'Internal Server Error',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
