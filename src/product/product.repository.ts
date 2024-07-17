import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Product } from '../entities/index.entity';
import { CreateProductDto, UpdateProductDto } from 'src/dto/index.dto';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product) private readonly productModel: typeof Product,
  ) {}

  async createProduct(createProductDto: CreateProductDto): Promise<Product> {
    return await this.productModel.create(createProductDto);
    // INSERT INTO products (name, description, category, price) VALUES (name, description, category, price)
  }

  async findAll(): Promise<Product[]> {
    return await this.productModel.findAll();
    // SELECT * FROM products
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productModel.findOne({ where: { id } });
    return product;
    // SELECT * FROM products WHERE id = id
  }

  async update(id: string, newProduct: UpdateProductDto): Promise<Product> {
    const product = await this.findOne(id);
    return await product.update(newProduct);
    // UPDATE products SET name = name, description = description, price = price WHERE id = id
  }

  async delete(id: string): Promise<any> {
    const product = await this.findOne(id);
    await product.destroy();
    // DELETE FROM products WHERE id = id
  }
}
